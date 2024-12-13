import { Injectable } from "@nestjs/common";
import { MariadbBaseAbstractRepository } from "src/common/repositories/mariadb/base.abstract.repository";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserRepository extends MariadbBaseAbstractRepository<User> {
  constructor(@InjectRepository(User) userRepository: Repository<User>) {
    super(userRepository)
  }
}
