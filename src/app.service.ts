import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    Logger.log(`Hello!`);
    return 'Hello!';
  }
}
