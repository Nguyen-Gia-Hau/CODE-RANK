import { Injectable } from '@nestjs/common';
import { TokenRepository } from './tokens.repository';
import { CreateTokenDto } from './dto/create-token.dto';
@Injectable()
export class TokensService {
  constructor(private readonly tokenRepository: TokenRepository) { }

  async save(createTokenDto: CreateTokenDto) {
    const token = this.tokenRepository.create(createTokenDto)
    return await this.tokenRepository.save(token)
  }

  async findTokenByKey(key: string) {
    return await this.tokenRepository.findByCondition({ where: { key } })
  }

  async revokeToken(key: string): Promise<boolean> {
    const tokenEntity = await this.findTokenByKey(key)

    if (!tokenEntity) return false;

    if (tokenEntity.isRevoked == false) {
      const tokenToUpdate = await this.tokenRepository.preload({
        id: tokenEntity.id,
        isRevoked: true,
      });

      console.log(tokenToUpdate)

      if (tokenToUpdate) {
        await this.tokenRepository.save(tokenToUpdate);
      }
    }

    return true
  }
}
