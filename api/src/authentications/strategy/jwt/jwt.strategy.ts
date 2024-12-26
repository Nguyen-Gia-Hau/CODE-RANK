
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtAuthConfigurationService } from 'src/configurations/authentications/jwt/configuration.service';
import { AUTH_PROVIDERS } from 'src/common/constants/authentication/auth.constants';
import { TokensService } from 'src/modules/mariadb/tokens/tokens.service';
import { AuthService, IJwtPayload } from 'src/authentications/auth.service';
import { UsersService } from 'src/modules/mariadb/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, AUTH_PROVIDERS.JWT) {
  constructor(
    private readonly tokensService: TokensService,
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    jwtAuthConfigurationService: JwtAuthConfigurationService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtAuthConfigurationService.secret,
      passReqToCallback: true,
    });
  }

  async validate(req: any, payload: IJwtPayload) {
    const tokenInfo = await this.tokensService.findTokenByKey(payload.tokenKey)
    if (tokenInfo.isRevoked == true) {
      throw new UnauthorizedException('Token has been revoked');
    }

    if (tokenInfo.type == 'REFRESH_TOKEN') {
      const authHeader = req.headers['authorization'];
      const refreshToken = authHeader.replace('Bearer ', '').trim();

      console.log(refreshToken)

      await this.tokensService.revokeToken(payload.tokenKey)
      const user = await this.userService.findById(payload.sub)
      return await this.authService.generateLoginResponse(user)
    }

    return { userId: payload.sub, email: payload.email, tokenKey: payload.tokenKey };
  }
}

