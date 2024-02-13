import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PaginationInterceptor } from './interceptor/pagination.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true }),
    new ValidationPipe({
      transform: true,
      transformOptions: { groups: ['transform'] },
    }),
  );

  app.useGlobalInterceptors(new PaginationInterceptor());

  const ngrokPattern = /https:\/\/[a-zA-Z0-9-]+\.ngrok-free\.app(.*)/;
  const regexPattern: RegExp = /.durvalmusicshop.*\.vercel\.app.*/;
  const localUrl: string = 'http://localhost:3000';
  const acceptedValuesArray = [localUrl, ngrokPattern];

  const corsOptions = {
    origin: acceptedValuesArray,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  };
  app.enableCors(corsOptions);

  const config = new DocumentBuilder()
    .setTitle("Mo'money less problems app Back-end")
    .setDescription(
      'Back-end nest.js app that connects investors with investment advisors',
    )
    .setVersion('1.0.0')
    .addTag('login')
    .addTag('advisors')
    .addTag('investors')
    .addTag('intestment-types')
    .addTag('products')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  const port = Number(process.env.PORT) || 3001;

  await app.listen(port);
}

bootstrap();
