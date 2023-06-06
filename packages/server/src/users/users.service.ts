import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import type { User } from "@prisma/client";
import type { CreateUserDto } from "./dto/create-user.dto";
import { ZodValidationPipe } from "@anatine/zod-nestjs";
import * as bcrypt from "bcrypt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UsersService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly configService: ConfigService
    ) { }

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

        return userByUsername;
    }

    async create(data: CreateUserDto): Promise<User> {
        const { username, email, name, password } = data;

        const saltRounds = this.configService.get<number>("bcrypt.salt") ?? 10;

        const hashedPassword = await bcrypt.hash(
            password,
            saltRounds
        );

        const user = await this.prisma.user.create({
            data: {
                username,
                email,
                name,
                password: hashedPassword,
            },
        });

        return user;
    }
}
