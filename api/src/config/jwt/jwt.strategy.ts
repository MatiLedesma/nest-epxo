import { Injectable } from "@nestjs/common";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { configuration } from "../global/configuration";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configuration.secret,
        });
    }

    async validate(payload: any): Promise<any> {
        return { name: payload.name, lastname: payload.lastname, email: payload.email, id: payload.id };
    }
}