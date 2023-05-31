import { Module } from '@nestjs/common';
import { CharitiesService } from './charities.service';
import { CharitiesController } from './charities.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CharitiesController],
  providers: [CharitiesService],
  imports: [PrismaService]
})
export class CharitiesModule {}
