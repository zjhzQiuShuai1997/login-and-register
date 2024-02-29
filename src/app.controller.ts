import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginGuard } from './login.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('testA')
  @UseGuards(LoginGuard)
  testA(): string {
    return 'aaaa'
  }

  @Get('testB')
  @UseGuards(LoginGuard)
  testB(): string {
    return 'bbb'
  }
}
