import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthProvider } from "./entities/auth-provider.entity";
import { Repository } from "typeorm";
import { MariadbBaseAbstractRepository } from "src/common/repositories/mariadb/base.abstract.repository";

@Injectable()
export class AuthProviderRepository extends MariadbBaseAbstractRepository<AuthProvider> {
  constructor(
    @InjectRepository(AuthProvider) private readonly authProviderRepository: Repository<AuthProvider>
  ) {
    super(authProviderRepository)
  }
}
