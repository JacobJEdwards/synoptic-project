import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { ConfigService } from "@nestjs/config";
import { UsersController } from "./users.controller";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "src/auth/jwt/jwt.strategy";

@Module({
  providers: [UsersService, ConfigService, JwtStrategy],
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("JWT.SECRET"),
        secretOrPrivateKey: configService.get<string>("JWT.SECRET"),
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
