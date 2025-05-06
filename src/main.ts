import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerErrorInterceptor, Logger as PinoLogger } from 'nestjs-pino';
import { NextFunction, Request, Response } from 'express';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.useLogger(app.get(PinoLogger));

  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  app.use((req: Request, res: Response, next: NextFunction) => {
    const { method, originalUrl } = req
    if (method === 'OPTIONS' || originalUrl === '/favicon.ico' || originalUrl.startsWith('/health')) {
      return next();
    }
    const requestStartTime: number = new Date().getTime()
    res.on('finish', () => {
      const { statusCode } = res
      const responseTime: number = new Date().getTime()
      const duration: number = responseTime - requestStartTime
      Logger.log(`${method} ${originalUrl} - status<${statusCode}> - ${duration}ms`);
    })
    next();
  });

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
