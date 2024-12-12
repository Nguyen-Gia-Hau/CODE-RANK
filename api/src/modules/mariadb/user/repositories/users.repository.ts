import { Injectable } from "@nestjs/common";
import { MariadbBaseAbstractRepository } from "src/common/repositories/mariadb/base.abstract.repository";
import { User } from "../entities/user.entity";
import { UserRepositoryInterface } from "./users.repository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";



@Injectable()
export class UsersRepository
  extends MariadbBaseAbstractRepository<User>
  implements UserRepositoryInterface {
  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
  ) {
    super(UserRepository);
  }
}
