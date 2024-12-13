import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) { }

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto)
    return await this.userRepository.save(user)
  }

  async findByEmail(email: string) {
    return await this.userRepository.findByCondition({ where: { email } })
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const entityToUpdate = await this.userRepository.preload({
      id,
      ...updateUserDto
    })
    return await this.userRepository.save(entityToUpdate)
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
