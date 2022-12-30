import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login.dto';

@Controller('user')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // TODO: Completar el registro
  // Que te devuleva el token y hacer el login
  @Post('register')
  create(@Body() createAuthDto: CreateUserDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('login')
  loginUser(@Body() loginDto: LoginUserDto) {
    return this.authService.login(loginDto);
  }

}
