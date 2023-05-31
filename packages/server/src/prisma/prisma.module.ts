import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/**
 * Module for PrismaService 
 */
@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule {}
