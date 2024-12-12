import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { GoogleStrategy } from "./google/google.strategy";
import { GoogleAuthConfigurationModule } from "src/configurations/authentications/google/configuration.module";
import { GithubAuthConfigurationModule } from "src/configurations/authentications/github/configuration.module";
import { GitHubStrategy } from "./github/github.strategy";

@Module({
  imports: [
    GoogleAuthConfigurationModule,
    GithubAuthConfigurationModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    GoogleStrategy,
    GitHubStrategy
  ]
})
export class AuthModule { }
