import { Module, Logger } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "src/users/users.module";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./local/local.strategy";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { JwtStrategy } from "./jwt/jwt.strategy";
import { jwtSecret } from './CONFIG'

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
        secret: jwtSecret,
        secretOrPrivateKey: jwtSecret,
    }),

  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }
