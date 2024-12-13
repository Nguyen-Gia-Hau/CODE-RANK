import { Module } from '@nestjs/common';
import { AuthProvidersService } from './auth-providers.service';
import { AuthProvidersController } from './auth-providers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthProvider } from './entities/auth-provider.entity';
import { AuthProviderRepository } from './auth-providers.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthProvider])
  ],
  controllers: [AuthProvidersController],
  providers: [AuthProvidersService, AuthProviderRepository],
  exports: [AuthProvidersService]
})
export class AuthProvidersModule { }