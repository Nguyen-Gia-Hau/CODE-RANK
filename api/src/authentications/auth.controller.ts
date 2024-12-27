
import { Body, Controller, Get, Post, Req, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import { AUTH_PROVIDERS } from "src/common/constants/authentication/auth.constants";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get(`${AUTH_PROVIDERS.GOOGLE}`)
  @UseGuards(AuthGuard(AUTH_PROVIDERS.GOOGLE))
  async authenticateWithGoogle() {
    // This endpoint redirects to Google's OAuth flow
  }

  @Get(`${AUTH_PROVIDERS.GOOGLE}/callback`)
  @UseGuards(AuthGuard(AUTH_PROVIDERS.GOOGLE))
  async googleCallback(@Req() req: Request) {
    return this.authService.handleOAuthLogin(req, AUTH_PROVIDERS.GOOGLE);
  }

  @Get(`${AUTH_PROVIDERS.GITHUB}`)
  @UseGuards(AuthGuard(AUTH_PROVIDERS.GITHUB))
  async authenticateWithGithub() {
    // This endpoint redirects to GitHub's OAuth flow
  }

  @Get(`${AUTH_PROVIDERS.GITHUB}/callback`)
  @UseGuards(AuthGuard(AUTH_PROVIDERS.GITHUB))
  async githubCallback(@Req() req: Request) {
    return this.authService.handleOAuthLogin(req, AUTH_PROVIDERS.GITHUB);
  }

  @Post(`${AUTH_PROVIDERS.LOCAL}/login`)
  @UseGuards(AuthGuard(AUTH_PROVIDERS.LOCAL))
  async login(@Req() req: any) {
    return this.authService.generateLoginResponse(req.user);
  }

  @UseGuards(AuthGuard(AUTH_PROVIDERS.JWT))
  @Post(`${AUTH_PROVIDERS.LOCAL}/logout`)
  async logout(@Req() req: any) {
    return this.authService.logout(req);
  }

  @Post('refresh-token')
  async refreshToken(@Body('refreshToken') token: string) {
    return this.authService.refreshToken(token)
  }

  // controller for test
  @UseGuards(AuthGuard(AUTH_PROVIDERS.JWT))
  @Get('profile')
  getProfile(@Req() req: any) {
    return req.user;
  }
}

