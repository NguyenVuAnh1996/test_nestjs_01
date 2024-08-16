import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../users/dto/login.dto';
import { LogoutDto } from '../users/dto/logout.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async logIn(@Body() loginDto: LoginDto) {
    return await this.authService.signIn(loginDto)
  }

  @Post('logout')
  async logOut(@Body() logoutDto: LogoutDto) {
    return await this.authService.removeNotiTokenWhenLogOut(logoutDto);
  }
}
