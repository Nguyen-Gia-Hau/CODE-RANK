
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtAuthConfigurationService } from 'src/configurations/authentications/jwt/configuration.service';
import { AUTH_PROVIDERS } from 'src/common/constants/authentication/auth.constants';
import { TokensService } from 'src/modules/mariadb/tokens/tokens.service';
import { Request } from 'express';
import { IJwtPayload } from 'src/authentications/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, AUTH_PROVIDERS.JWT) {
  constructor(
    private readonly tokensService: TokensService,
    jwtAuthConfigurationService: JwtAuthConfigurationService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtAuthConfigurationService.secret,
      //passReqToCallback: true,
    });
  }

  async validate(payload: IJwtPayload) {
    const tokenInfo = await this.tokensService.findTokenByKey(payload.tokenKey)
    if (tokenInfo.isRevoked == true) {
      throw new UnauthorizedException('Token has been revoked');
    }

    if (tokenInfo.type == 'REFRESH_TOKEN') {
      throw new UnauthorizedException('Token invalid')
    }

    return { userId: payload.sub, email: payload.email, tokenKey: payload.tokenKey };
  }
}

