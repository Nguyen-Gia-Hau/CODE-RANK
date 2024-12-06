import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ApplicaitionConfigurationService } from './configurations/application/configuration.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = new DocumentBuilder()
    .setTitle('CODE-RANK')
    .setDescription('The CODE-RANK API description')
    .setVersion('1.0')
    .addTag('CODE-RANK')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  // get app config for cors serttings and starting the app.
  const applicationConfiguration: ApplicaitionConfigurationService = app.get(ApplicaitionConfigurationService)

  await app.listen(applicationConfiguration.port, applicationConfiguration.host, () => {
    console.log(`${applicationConfiguration.name} is running on:`, {
      host: applicationConfiguration.host,
      port: applicationConfiguration.port
    });
    console.log(`Swagger running at: http://${applicationConfiguration.host}:${applicationConfiguration.port}/api`);
  });
}

bootstrap();
