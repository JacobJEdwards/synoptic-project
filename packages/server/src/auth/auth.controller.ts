import {Controller, Get, Post, Request, UseGuards} from "@nestjs/common";
import {LocalAuthGuard} from "./local/local-auth.guard";
import {JwtAuthGuard} from "./jwt/jwt-auth.guard";
import {AuthService} from "./auth.service";
import {ApiTags} from "@nestjs/swagger";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @UseGuards(LocalAuthGuard)
    @Post("login")
    async login(@Request() req: any) {
        return this.authService.login(req.user);
    }

    @Post("register")
    async register(@Request() req: any) {
        return this.authService.register(req.body);
    }
}
