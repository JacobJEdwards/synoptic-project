import { Module } from '@nestjs/common';
import { CharitiesService } from './charities.service';
import { CharitiesController } from './charities.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [CharitiesController],
  providers: [CharitiesService],
  imports: [PrismaModule]
})
export class CharitiesModule {}
