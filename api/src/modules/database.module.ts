import { Module } from "@nestjs/common";
import { MariadbModule } from "./mariadb/mariadb.module";

@Module({
  imports: [
    MariadbModule
  ]
})
export class DatabaseModule { }
