import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { GoogleStrategy } from "./google/google.strategy";
import { GoogleAuthConfigurationModule } from "src/configurations/authentications/google/configuration.module";
import { GithubAuthConfigurationModule } from "src/configurations/authentications/github/configuration.module";
import { GitHubStrategy } from "./github/github.strategy";
import { UsersModule } from "src/modules/mariadb/users/users.module";
import { AuthProvidersModule } from "src/modules/mariadb/auth-providers/auth-providers.module";

@Module({
  imports: [
    GoogleAuthConfigurationModule,
    GithubAuthConfigurationModule,
    UsersModule,
    AuthProvidersModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    GoogleStrategy,
    GitHubStrategy,
  ]
})
export class AuthModule { }
