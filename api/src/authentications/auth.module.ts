import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { GoogleStrategy } from "./google/google-auth.strategy";
import { GoogleAuthConfigurationModule } from "src/configurations/authentications/google/configuration.module";

@Module({
  imports: [GoogleAuthConfigurationModule],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy]
})
export class AuthModule { }
