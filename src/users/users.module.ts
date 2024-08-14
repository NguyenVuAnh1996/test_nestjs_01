import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { NotiService } from './noti.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    NotiService
  ],
})
export class UsersModule {}
