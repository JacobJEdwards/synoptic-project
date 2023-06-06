import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [UsersService, ConfigService],
  imports: [PrismaModule],
  exports: [UsersService],
})
export class UsersModule {}
