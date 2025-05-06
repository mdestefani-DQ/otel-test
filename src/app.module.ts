import { Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

const redactFields = [
  'req.headers.authorization',
  'req.body.password',
  'req.body.confirmPassword',
];

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRoot({
      pinoHttp: {
        // transport: process.env.NODE_ENV !== 'production'
        //   ? { target: 'pino-pretty' }
        //   : undefined,
        redact: {
          paths: redactFields,
          censor: '**GDPR COMPLIANT**',
        },
      },
      exclude: [
        // disable nest-js-pino middleware
        { method: RequestMethod.ALL, path: '*' },
      ]
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
