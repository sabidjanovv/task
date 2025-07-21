import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function start() {
  try {
    const app = await NestFactory.create(AppModule);
    const PORT = process.env.PORT || 3030;

    // Global validation pipe
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    // Global prefix
    app.setGlobalPrefix('api');

    // Enable CORS
    app.enableCors();

    // Swagger configuration
    const config = new DocumentBuilder()
      .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter your JWT token to authorize',
      })
      .setTitle('Test API')
      // .setDescription()
      .setVersion('1.0')
      .addTag('NestJS, MongoDB')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    await app.listen(PORT, () =>
      console.log(
        `Server is running at http://localhost:${PORT}/api`,
      ),
    );
  } catch (error) {
    console.error('❌ Server start error:', error);
  }
}

start();
