import { Module } from '@nestjs/common';
import { ApplicationProviderModule } from './providers/application/provider.module';

@Module({
  imports: [
    ApplicationProviderModule
  ],
})
export class AppModule { }
