import { Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  getHello(@Req() req: Request) {
    // return this.appService.getHello();
    return 'hello bois';
  }
}
