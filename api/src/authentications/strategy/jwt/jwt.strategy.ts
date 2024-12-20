

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtAuthConfigurationService } from 'src/configurations/authentications/jwt/configuration.service';
import { AUTH_PROVIDERS } from 'src/common/constants/authentication/auth.constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, AUTH_PROVIDERS.JWT) {
  constructor(jwtAuthConfigurationService: JwtAuthConfigurationService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtAuthConfigurationService.secret,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}
