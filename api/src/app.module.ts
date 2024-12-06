import { Module } from '@nestjs/common';
import { ApplicationProviderModule } from './providers/application/provider.module';
import { ProviderModule } from './providers/provider.module';

@Module({
  imports: [
    ProviderModule
  ],
})
export class AppModule { }
