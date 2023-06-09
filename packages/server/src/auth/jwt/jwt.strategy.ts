import {ExtractJwt, Strategy} from "passport-jwt";
import {PassportStrategy} from "@nestjs/passport";
import {Injectable, Logger} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";

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
        Logger.log(payload, "JwtStrategy");
        return {id: payload.sub, username: payload.username};
    }
}
