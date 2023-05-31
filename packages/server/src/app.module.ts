import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { RecipesModule } from "./recipes/recipes.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { ConfigModule } from "@nestjs/config";
import config from "./config/configuration";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    PrismaModule,
    RecipesModule,
    AuthModule,
    UsersModule,
  ],
})

export class AppModule {}
