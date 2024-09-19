import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Trello example')
    .setDescription('The Trello functionality API description')
    .setVersion('1.0')
    .addApiKey(
      {
        type: 'apiKey',
        in: 'header', // Use 'header' for API keys in headers
        name: 'Authorization', // The name of the header
      },
      'Authorization Token', // The name of the security scheme
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}
bootstrap();
