import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    // Create some tcp spans
    await fetch('https://google.com/');
    return this.appService.getHello();
  }
}
