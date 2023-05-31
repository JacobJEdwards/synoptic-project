import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import type { User } from '@prisma/client'

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
}
