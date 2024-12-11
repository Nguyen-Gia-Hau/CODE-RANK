import { Module } from "@nestjs/common";
import { MariadbConfigurationModule } from "src/configurations/database/mariadb/configuration.module";

@Module({
  imports: [
    MariadbConfigurationModule,
    MariadbConfigurationModule
  ]
})
export class DatabaseProviderModule { }
