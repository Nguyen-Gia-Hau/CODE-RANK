import { Module } from '@nestjs/common';
import { DatabaseProviderModule } from './providers/database/provider.module';
import { AuthModule } from './authentications/auth.module';
import { ApplicationConfigurationModule } from './configurations/application/configuration.module';
import { DatabaseModule } from './modules/database.module';

@Module({
  imports: [
    ApplicationConfigurationModule,
    DatabaseProviderModule,
    DatabaseModule,
    AuthModule,
  ],
})
export class AppModule { }
