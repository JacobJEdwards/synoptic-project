import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import type { User } from "@prisma/client";
import type { CreateUserDto } from "./dto/create-user.dto";
import { ZodValidationPipe } from '@anatine/zod-nestjs'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(emailOrUsername: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: emailOrUsername,
      },
    });

    if (user) return user;

    const userByUsername = await this.prisma.user.findUnique({
      where: {
        username: emailOrUsername,
      },
    });

    Logger.log(userByUsername)

    return userByUsername;
  }

  async create(data: CreateUserDto): Promise<User> {
    const user = await this.prisma.user.create({
      data,
    });

    return user;
  }
}
