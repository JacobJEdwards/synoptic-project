import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import type { User } from '@prisma/client'
import type { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    async findOne(username: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                username: username,
            },
        });

        return user;
    }

    async create(data: CreateUserDto): Promise<User> {
        const user = await this.prisma.user.create({
            data,
        });

        return user;
    }
}
