import { Injectable } from "@nestjs/common";
import { AuthProvidersService } from "src/modules/mariadb/auth-providers/auth-providers.service";
import { UsersService } from "src/modules/mariadb/users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly authProvidersService: AuthProvidersService
  ) { }
  async googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    const { providerId, email, firstName, lastName, picture } = req.user
    const currentUser = await this.userService.findByEmail(email)
    if (!currentUser) {
      await this.userService.create({
        email: email,
        name: lastName + ' ' + firstName,
        picture: picture,
        authProvider: {
          provider: 'google',
          providerId: providerId
        }
      })
    }
    await this.userService.update(currentUser.id, {
      email: email,
      name: lastName + ' ' + firstName,
      picture: picture,
    })
    return this.userService.findByEmail(email)
  }

  githubLogin(req) {
    if (!req.user) {
      return 'No user from github';
    }

    return {
      message: 'User information from github',
      user: req.user,
    };
  }

}
