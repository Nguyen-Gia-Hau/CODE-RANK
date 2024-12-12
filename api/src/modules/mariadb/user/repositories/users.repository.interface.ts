import { MariadbBaseInterfaceRepository } from "src/common/repositories/mariadb/base.interface.repository";
import { User } from "../entities/user.entity";


export interface UserRepositoryInterface
  extends MariadbBaseInterfaceRepository<User> { }
