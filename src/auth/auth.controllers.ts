import { Controller, Post, Body, Inject } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  create(@Body() createUserDto: any) {
    return this.authService.reate(createUserDto);
  }
}
