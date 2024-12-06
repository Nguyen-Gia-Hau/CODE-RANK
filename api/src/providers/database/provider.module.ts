import { Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { MariadbConfigurationService } from "src/configurations/database/mariadb/configuration.service";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [],
      useFactory: async (mariadbConfigurationService: MariadbConfigurationService) => {
        return {
          type: 'mariadb',
          host: mariadbConfigurationService.host,
          port: mariadbConfigurationService.port,
          username: mariadbConfigurationService.username,
          password: mariadbConfigurationService.password,
          database: mariadbConfigurationService.dbName,
          autoLoadEntities: true,
          synchronize: true
        }
      },
      inject: [MariadbConfigurationService]
    } as TypeOrmModuleAsyncOptions)
  ]
})
export default class MariadbProviderModule { }
