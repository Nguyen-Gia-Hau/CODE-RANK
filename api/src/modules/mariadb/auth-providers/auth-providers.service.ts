import { Injectable } from '@nestjs/common';
import { CreateAuthProviderDto } from './dto/create-auth-provider.dto';
import { UpdateAuthProviderDto } from './dto/update-auth-provider.dto';
import { AuthProviderRepository } from './auth-providers.repository';

@Injectable()
export class AuthProvidersService {
  constructor(private readonly authProviderRepository: AuthProviderRepository) { }
  async create(createAuthProviderDto: CreateAuthProviderDto) {
    const authProvider = this.authProviderRepository.create(createAuthProviderDto)
    return await this.authProviderRepository.save(authProvider)
  }

  async findByProviderId(id: string) {
    return await this.authProviderRepository.findByCondition({ where: { providerId: id } })
  }

  findAll() {
    return `This action returns all authProviders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authProvider`;
  }

  update(id: number, updateAuthProviderDto: UpdateAuthProviderDto) {
    return `This action updates a #${id} authProvider`;
  }

  remove(id: number) {
    return `This action removes a #${id} authProvider`;
  }
}
