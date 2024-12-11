import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { GithubAuthConfigurationModule } from "src/configurations/authentications/github/configuration.module";

@Module({
  imports: [
    GithubAuthConfigurationModule,
    PassportModule.register({
      defaultStrategy: 'github'
    })
  ]
})
export class GitHubAuthProviderModule { }
