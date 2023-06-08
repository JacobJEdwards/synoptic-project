import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConfigService } from '@nestjs/config';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService, ConfigService],
  imports: [PrismaModule],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
