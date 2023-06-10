import {Controller, Get, Logger, Param, ParseIntPipe, Req, UseGuards} from '@nestjs/common';
import {UsersService} from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.usersService.getProfile(id);
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    async getProfile(@Req() req: any) {
        Logger.log(req)
        return this.usersService.getProfile(req.user.id)
    }
}
