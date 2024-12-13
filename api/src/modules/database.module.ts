import { Module } from "@nestjs/common";
import { MariadbFeatureModule } from "./mariadb/mariadb.module";

@Module({
  imports: [
    MariadbFeatureModule
  ]
})
export class FeatureModule { }
