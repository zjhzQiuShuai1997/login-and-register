import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, Inject, Res, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dot'; 
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { Validator } from 'class-validator';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {};

  @Inject(JwtService)
  private jwtService:JwtService;

  @Post('login')
  async login(@Body(ValidationPipe) user: LoginDto, @Res({passthrough: true}) res: Response) {
      const foundUser = await this.userService.login(user);
      if(foundUser) {
        const token = await this.jwtService.signAsync({
          user: {
            id: foundUser.id,
            username: foundUser.username
          }
        })
        res.setHeader('token', token);
       return new HttpException('登录成功', 200)
      } else {
        return '登录失败';
      }
  }


  @Post('/register')
  async register(@Body(ValidationPipe) user: RegisterDto) {
    return await this.userService.register(user);
  }
}
