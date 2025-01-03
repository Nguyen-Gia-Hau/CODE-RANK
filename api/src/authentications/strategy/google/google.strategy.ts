import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { GoogleAuthConfigurationService } from 'src/configurations/authentications/google/configuration.service';
import { AUTH_PROVIDERS } from 'src/common/constants/authentication/auth.constants';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, AUTH_PROVIDERS.GOOGLE) {
  constructor(private readonly googleAuthConfig: GoogleAuthConfigurationService) {
    super({
      clientID: googleAuthConfig.clientId,
      clientSecret: googleAuthConfig.clientSecret,
      callbackURL: `http://localhost:8080/auth/google/callback`,
      scope: ['email', 'profile'],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const user = {
      providerId: profile.id,
      email: emails[0].value,
      fullName: name.familyName + ' ' + name.givenName,
      picture: photos[0].value,
      accessToken,
      refreshToken,
    };

    done(null, user);
  }
}
