import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  // Your CORS configuration code:
  const ngrokPattern = /https:\/\/[a-zA-Z0-9-]+\.ngrok-free\.app(.*)/;
  const regexPattern: RegExp = /.durvalmusicshop.*\.vercel\.app.*/;
  const localUrl: string = 'http://localhost:3000';
  const acceptedValuesArray = [regexPattern, localUrl, ngrokPattern];

  const corsOptions = {
    origin: acceptedValuesArray,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  };

  // Enable CORS with the given options:
  app.enableCors(corsOptions);
  await app.listen(3000);
}

bootstrap();
