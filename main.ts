import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import getLogLevels from 'src/utils/getLogLevels';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: getLogLevels(process.env.STAGE === 'prod'),
  });

  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  //app.use(csurf())
  const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true,
  };
  app.enableCors(corsOptions);
  await app.listen(3010);

  // const server = app.getHttpServer();
  // const router = server._events.request._router;
  // console.log(expressListRoutes({}, router));
}
bootstrap();
