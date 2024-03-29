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
  const localUrl: string = 'http://localhost:3000';
  const deploy: RegExp = /.easybank-investments.vercel.app.*/;
  const production: RegExp = /.investment-app-client-brunomoleta.vercel.app.*/;
  const acceptedValuesArray = [localUrl, ngrokPattern, production, deploy];

  const corsOptions = {
    origin: acceptedValuesArray,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  };
  app.enableCors(corsOptions);

  const config = new DocumentBuilder()
    .setTitle('Easybank Investments back end doc')
    .setDescription(
      'Back-end nest.js app that connects investors with investment advisors.',
    )

    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'bearerAuth', // this is the reference name for security
    )
    .setLicense(
      'Back end repository',
      'https://github.com/brunomoleta/Investment-app-server',
    )
    .setExternalDoc(
      'Full project explanation',
      'https://www.brunomoleta.com.br/easy-bank-investments',
    )
    .addServer('https://investment-fullstack.onrender.com/', 'deployed url;')
    .addServer('http://localhost:3001/', 'local url')

    .setVersion('1.0.0')

    .build();

  const document = SwaggerModule.createDocument(app, config);

  document.tags = [
    { name: 'admin', description: 'Operations related to the super user' },
    {
      name: 'login',
      description: 'Relates to user login and token activation',
    },
    { name: 'advisor', description: "Relates to the investment's advisor" },
    { name: 'investor', description: "Relates to the investor's operations" },
    { name: 'investment_type', description: 'Relates to the investment_type' },
  ];

  SwaggerModule.setup('doc', app, document);

  const port = Number(process.env.PORT) || 3001;

  await app.listen(port);
}

bootstrap();
