import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { RecipesModule } from './recipes/recipes.module';
import { UtilitiesModule } from './utilities/utilities.module';

@Module({
  imports: [PrismaModule, RecipesModule],
})
export class AppModule {}
