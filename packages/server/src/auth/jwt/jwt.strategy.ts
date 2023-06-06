import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { jwtSecret } from "../CONFIG";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>("JWT.SECRET"),
            secretOrPrivateKey: configService.get<string>("JWT.SECRET"),
            secret: configService.get<string>("JWT.SECRET"),
        });
    }

    async validate(payload: any) {
        return { id: payload.sub, username: payload.username };
    }
}
