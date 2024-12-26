import { Injectable } from "@nestjs/common";
import { MariadbBaseAbstractRepository } from "src/common/repositories/mariadb/base.abstract.repository";
import { Token } from "./entities/token.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";


@Injectable()
export class TokenRepository extends MariadbBaseAbstractRepository<Token> {
  constructor(
    @InjectRepository(Token) private readonly tokenRepository: Repository<Token>
  ) {
    super(tokenRepository)
  }
}
