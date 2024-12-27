
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtAuthConfigurationService } from 'src/configurations/authentications/jwt/configuration.service';
import { AUTH_PROVIDERS } from 'src/common/constants/authentication/auth.constants';
import { TokensService } from 'src/modules/mariadb/tokens/tokens.service';
import { AuthService, IJwtPayload } from 'src/authentications/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, AUTH_PROVIDERS.JWT) {
  constructor(
    private readonly tokensService: TokensService,
    private readonly authService: AuthService,
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
    if (tokenInfo.isRevoked == true || tokenInfo.type == 'REFRESH_TOKEN' || !tokenInfo) {
      throw new UnauthorizedException('Token Invalid');
    }
    return payload;
  }
}

