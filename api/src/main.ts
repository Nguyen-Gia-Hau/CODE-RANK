import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ApplicaitionConfigurationService } from './configurations/application/configuration.service';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);


  // get app config for cors serttings and starting the app.
  const applicationConfiguration: ApplicaitionConfigurationService = app.get(ApplicaitionConfigurationService)
  await app.listen(applicationConfiguration.port, applicationConfiguration.host, () => console.log(`${applicationConfiguration.name} is running on: `, {
    host: applicationConfiguration.host,
    port: applicationConfiguration.port
  }));

}

bootstrap();
