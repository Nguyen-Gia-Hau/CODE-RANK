import { Module } from "@nestjs/common";
import { ApplicationProviderModule } from "./application/provider.module";
import { MariadbConfigurationModule } from "src/configurations/database/mariadb/configuration.module";

@Module({
  imports: [
    ApplicationProviderModule,
    MariadbConfigurationModule
  ]
})
export class ProviderModule { }
