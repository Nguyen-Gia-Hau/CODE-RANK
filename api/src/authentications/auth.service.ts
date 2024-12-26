
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { calculateExpiresAt } from "src/common/utils/time-utils";
import { JwtAuthConfigurationService } from "src/configurations/authentications/jwt/configuration.service";
import { AuthProvidersService } from "src/modules/mariadb/auth-providers/auth-providers.service";
import { TokensService } from "src/modules/mariadb/tokens/tokens.service";
import { User } from "src/modules/mariadb/users/entities/user.entity";
import { UsersService } from "src/modules/mariadb/users/users.service";
import * as bcrypt from "bcrypt";
import { generateUniqueKey } from "src/common/utils/unique-key-generator";

// Interface to define the structure of the JWT payload
export interface IJwtPayload {
  sub: number; // User ID
  email: string; // User email
  roles?: string[]; // Optional roles associated with the user
  tokenKey: string;
  [key: string]: any; // Allows for extending additional attributes
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly authProviderService: AuthProvidersService,
    private readonly tokenService: TokensService,
    private readonly jwtService: JwtService,
    private readonly jwtAuthConfigurationService: JwtAuthConfigurationService
  ) { }

  // Create the payload for the JWT token
  private createJwtPayload(user: User, tokenKey: string): IJwtPayload {
    return {
      sub: user.id,
      email: user.email,
      //roles: user.roles || [], // Assuming User has a 'roles' property
      tokenKey
    };
  }

  // Generate a JWT token from the given payload
  private createJwtToken(payload: IJwtPayload, expiresIn?: string): string {
    return this.jwtService.sign(payload, expiresIn ? { expiresIn } : undefined);
  }

  // Save token information to the database
  private async saveTokenToDB(user: User, key: string, type: string, expiresIn: string) {
    const expiresAt = calculateExpiresAt(expiresIn);

    await this.tokenService.save({
      key,
      type,
      expiresAt,
      user,
    });
  }

  // Create and save a token to the database
  private async createAndSaveToken(
    user: User,
    tokenType: "ACCESS_TOKEN" | "REFRESH_TOKEN",
    expiresIn: string
  ): Promise<string> {
    const key = generateUniqueKey();
    const payload = this.createJwtPayload(user, key);
    const token = this.createJwtToken(payload, expiresIn);
    await this.saveTokenToDB(user, key, tokenType, expiresIn);
    return token;
  }

  // Create an access token for the user
  private async createAccessToken(user: User): Promise<string> {
    return this.createAndSaveToken(user, "ACCESS_TOKEN", this.jwtAuthConfigurationService.accessExpiresIn);
  }

  // Create a refresh token for the user
  private async createRefreshToken(user: User): Promise<string> {
    return this.createAndSaveToken(user, "REFRESH_TOKEN", this.jwtAuthConfigurationService.refreshExpiresIn);
  }

  // Handle OAuth login and return tokens for the user
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

  // Validate a user's credentials using email and password
  public async validateUser(email: string, password: string): Promise<User | null> {
    const currentUser = await this.userService.findLocalAuthUserByEmail(email);
    if (!currentUser) return null;

    const isMatch = await bcrypt.compare(password, currentUser.authProvider.passwordHash);
    if (!isMatch) return null;

    return this.userService.findById(currentUser.id);
  }

  // Generate access and refresh tokens as a login response
  public async generateLoginResponse(user: User) {
    const [accessToken, refreshToken] = await Promise.all([
      this.createAccessToken(user),
      this.createRefreshToken(user),
    ]);
    return { accessToken, refreshToken };
  }

  // Handle user logout by revoking the provided token
  public async logout(req: any) {
    const user: IJwtPayload = req.user;
    return this.tokenService.revokeToken(user.tokenKey);
  }
}

