import { Module } from '@nestjs/common';
import { OtelLogger } from './logger.service';

@Module({
  providers: [OtelLogger],
  exports: [OtelLogger],
})
export class LoggerModule { }
