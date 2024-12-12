import { Module } from "@nestjs/common";
import MariadbProviderModule from "./mariadb/provider.module";
import MongoDBProviderModule from "./mongodb/provider.module";

@Module({
  imports: [
    MariadbProviderModule,
    MongoDBProviderModule,
  ]
})
export class DatabaseProviderModule { }
