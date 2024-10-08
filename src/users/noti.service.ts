import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Expo, ExpoPushErrorReceipt, ExpoPushMessage, ExpoPushSuccessTicket, ExpoPushTicket } from 'expo-server-sdk';
import { User } from "./entities/user.entity";
import { In, Like, Repository } from "typeorm";
import { NotificationRequest } from "./dto/noti-req.dto";
import { title } from "process";
import { expo_access_token } from "../constants/otherConstants";

@Injectable()
export class NotiService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>
  ) {}

  async removeNotiToken(notiToken: string) {
    const user = await this.userRepo.findOneBy({
      notitokens: Like(`%${notiToken}%`)
    })
    let currentTokenList: string[] = JSON.parse(user.notitokens);
    const newTokenList = currentTokenList.filter(x => x !== notiToken);
    const newUser = this.userRepo.create({
      ...user,
      notitokens: JSON.stringify(newTokenList)
    })
    try {
      await this.userRepo.save(newUser);
    } catch {
      throw new InternalServerErrorException('Hủy token thất bại');
    }
  }

  async sendNoti(notiReq: NotificationRequest) {
    let result: string[] = [];
    
    const tokenList = (await this.userRepo.find({
      where: {
        id: In(notiReq.userIds)
      },
      select: {
        notitokens: true,
      }
    })).map(x => JSON.parse(x.notitokens) as string[]).flat();

    let expo = new Expo({
      useFcmV1: true,
      accessToken: expo_access_token
    });

    let messages: ExpoPushMessage[] = []
    for (let token of tokenList) {
      if (!Expo.isExpoPushToken(token)) {
        let user = await this.userRepo.findOneBy({
          notitokens: token
        })
        result.push(`Error: Noti token ${token} of user: ${user.email} is not an expo push token`)
      }
      messages.push({
        to: token,
        title: notiReq.title,
        body: notiReq.body,
        sound: 'default',
        channelId: 'default',
        data: {
          withsome: 'some test data'
        }
      })
    }

    let chunks = expo.chunkPushNotifications(messages);
    let tickets: ExpoPushTicket[] = [];
    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
      } catch(error) {
        throw new InternalServerErrorException('Send notification failed: ' + JSON.stringify(error))
      }
    }

    let receiptIds: string[] = [];
    tickets.forEach((ticket: ExpoPushSuccessTicket) => {
      if (ticket?.id) {
        receiptIds.push(ticket.id)
      }
    })
    let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
    for (let chunk of receiptIdChunks) {
      try {
        let receipts: any = await expo.getPushNotificationReceiptsAsync(chunk);
        for (let receiptId in receipts) {
          let { status, details, message } = receipts[receiptId];
          if (status === 'ok') {
            continue;
          } else if (status === 'error') {
            result.push(`Error message from Google/ Apple: ${message}`)
            if (details && details.error) {
              result.push(`Error details: ${details.error}`)
              if (details.error === 'DeviceNotRegistered') {
                // delete that token
                // await this.removeNotiToken()
              }
            }
          }
        }
      } catch (error) {
        throw new InternalServerErrorException('Error when receiving responses: ' + JSON.stringify(error))
      }
    }

    return result;
  }
}