import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { TokensController } from './tokens.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './entities/token.entity';
import { TokenRepository } from './tokens.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Token])
  ],
  controllers: [TokensController],
  providers: [TokensService, TokenRepository],
  exports: [TokensService]
})
export class TokensModule { }
