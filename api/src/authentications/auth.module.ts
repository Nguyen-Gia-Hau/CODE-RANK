import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { GoogleAuthConfigurationModule } from "src/configurations/authentications/google/configuration.module";
import { GithubAuthConfigurationModule } from "src/configurations/authentications/github/configuration.module";
import { UsersModule } from "src/modules/mariadb/users/users.module";
import { AuthProvidersModule } from "src/modules/mariadb/auth-providers/auth-providers.module";
import { JwtAuthProviderModule } from "src/providers/authentication/JWT/jwt.provider.module";
import { LocalStrategy } from "./strategy/local/local.strategy";
import { GoogleStrategy } from "./strategy/google/google.strategy";
import { GitHubStrategy } from "./strategy/github/github.strategy";
import { JwtStrategy } from "./strategy/jwt/jwt.strategy";
import { JwtAuthConfigurationModule } from "src/configurations/authentications/jwt/configuration.module";

@Module({
  imports: [
    GoogleAuthConfigurationModule,
    GithubAuthConfigurationModule,
    JwtAuthConfigurationModule,
    JwtAuthProviderModule,
    UsersModule,
    AuthProvidersModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    GoogleStrategy,
    GitHubStrategy,
    LocalStrategy,
    JwtStrategy
  ]
})
export class AuthModule { }
