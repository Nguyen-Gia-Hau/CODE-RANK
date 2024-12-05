import { Module } from "@nestjs/common";
import { ApplicationConfigurationModule } from "src/configurations/application/configuration.module";

@Module({
  imports: [ApplicationConfigurationModule]
})
export class ApplicationProviderModule { }
