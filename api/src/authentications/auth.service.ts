
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JwtAuthConfigurationService } from "src/configurations/authentications/jwt/configuration.service";
import { AuthProvidersService } from "src/modules/mariadb/auth-providers/auth-providers.service";
import { User } from "src/modules/mariadb/users/entities/user.entity";
import { UsersService } from "src/modules/mariadb/users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly authProviderService: AuthProvidersService,
    private readonly jwtService: JwtService,
    private readonly jwtAuthConfigurationService: JwtAuthConfigurationService
  ) { }

  private createToken(user: User, expiresIn?: string) {
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.sign(payload, expiresIn ? { expiresIn } : undefined);
  }

  public createAccessToken(user: User) {
    return this.createToken(user);
  }

  public createRefreshToken(user: User) {
    return this.createToken(user, this.jwtAuthConfigurationService.refreshExpiresIn);
  }

  public async handleOAuthLogin(req: any, provider: string) {
    if (!req.user) return null;

    const { providerId, email, fullName, picture } = req.user;
    let authProviderOfUser = await this.authProviderService.findByProviderId(providerId);

    const userPayload = {
      email,
      name: fullName,
      picture,
      authProvider: {
        provider,
        providerId,
      },
    };

    const currentUser = authProviderOfUser
      ? await this.userService.update(authProviderOfUser.user.id, {
        email,
        name: fullName || authProviderOfUser.user.name,
        picture,
      })
      : await this.userService.create(userPayload);

    const user = await this.userService.findById(currentUser.id);
    return this.generateLoginResponse(user);
  }

  async validateUser(email: string, password: string) {
    const currentUser = await this.userService.findLocalAuthUserByEmail(email);
    if (
      currentUser &&
      currentUser.authProvider.password_hash === password
    ) {
      return this.userService.findById(currentUser.id);
    }
    return null;
  }

  public async generateLoginResponse(user: User) {
    const accessToken = this.createAccessToken(user);
    const refreshToken = this.createRefreshToken(user);

    return { accessToken, refreshToken };
  }

  public async logout(req: any) {
    req.logout?.();
    return { message: "Logout successful" };
  }
}

