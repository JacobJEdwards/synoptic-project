import { Controller, Request, Post, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "./local-auth.guard";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post("login")
    async login(@Request() req: any) {
        return req.user;
    }
}
