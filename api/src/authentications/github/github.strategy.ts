import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-github2";
import { GithubAuthConfigurationService } from "src/configurations/authentications/github/configuration.service";

@Injectable()
export class GitHubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private readonly githubAuthConfig: GithubAuthConfigurationService) {
    super({
      clientID: githubAuthConfig.clientId,
      clientSecret: githubAuthConfig.clientSecret,
      callbackURL: 'http://localhost:8080/auth/github/callback',
      scope: ['user:email']
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: Function) {
    console.log(profile)
    // Xử lý logic tìm hoặc tạo người dùng tại đây
    const user = {
      githubId: profile.id,
      username: profile.username,
      displayName: profile.displayName,
      accessToken,
      refreshToken,
    };
    done(null, user); // Gửi thông tin người dùng về Passport
  }
} 
