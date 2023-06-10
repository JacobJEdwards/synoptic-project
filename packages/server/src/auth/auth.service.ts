import {Injectable} from "@nestjs/common";
import {UsersService} from "src/users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {
    }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(email);

        if (!user) return null;

        const passCompare = await bcrypt.compare(pass, user?.password);

        if (user && passCompare) {
            const {password, ...result} = user;
            return result;
        }

        return null;
    }

    async login(user: any) {
        const payload = {email: user.email, sub: user.id};
        return {
            jwt: this.jwtService.sign(payload),
            user: user,
        };
    }

    async register(user: any) {
        const newUser = await this.usersService.create(user);
        const payload = {email: newUser.email, sub: newUser.id};

        const {password, ...result} = newUser;
        return {
            jwt: this.jwtService.sign(payload),
            user: result,
        };
    }
}
