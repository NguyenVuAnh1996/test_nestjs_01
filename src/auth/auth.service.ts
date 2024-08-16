import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../users/dto/login.dto';
import { LogoutDto } from '../users/dto/logout.dto';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user || user.password !== loginDto.password) {
      throw new UnauthorizedException();
    }
    let currentTokenList: string[] = JSON.parse(user.notitokens);
    if (!currentTokenList.includes(loginDto.notiToken)) {
      try {
        await this.usersService.update(user.id, {
          ...user,
          notitokens: JSON.stringify(
            currentTokenList.concat([loginDto.notiToken])
          )
        })
      } catch {
        throw new InternalServerErrorException('Cannot update noti token')
      }
    }
    return {
      access_token: await this.jwtService.signAsync({
        sub: user.id,
        email: user.email
      })
    }
  }

  async removeNotiTokenWhenLogOut(dto: LogoutDto) {
    const user = await this.usersService.findOne(dto.userId);

    let currentTokenList: string[] = JSON.parse(user.notitokens);
    if (currentTokenList.includes(dto.notiToken)) {
      const newTokenList = currentTokenList.filter(x => x !== dto.notiToken);
      try {
        await this.usersService.update(user.id, {
          ...user,
          notitokens: JSON.stringify(newTokenList)
        })
      } catch {
        throw new InternalServerErrorException('Cannot update noti token')
      }
    }
    return true;
  }
}
