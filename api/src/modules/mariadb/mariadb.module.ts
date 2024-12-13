import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { AuthProvidersModule } from "./auth-providers/auth-providers.module";
import { SessionsModule } from "./sessions/sessions.module";

@Module({
  imports: [
    UsersModule,
    AuthProvidersModule,
    SessionsModule
  ]
})

export class MariadbFeatureModule { }
