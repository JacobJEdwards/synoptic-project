import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException, Logger } from "@nestjs/common";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private AuthService: AuthService,
  ) {
    super({
        usernameField: "email",
        passwordField: "password",
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.AuthService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
