import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MongoDBConfigurationService } from "src/configurations/database/mongodb/configuration.service";
import { MongooseModuleAsyncOptions } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [],
      useFactory: async (mongodbConfigurationService: MongoDBConfigurationService) => {
        return mongodbConfigurationService.mongodbUrl
      },
      inject: [MongoDBConfigurationService]
    } as MongooseModuleAsyncOptions)
  ]
})
export default class MongoDBProviderModule { }
