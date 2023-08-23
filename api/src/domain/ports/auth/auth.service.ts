import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async singIn(username: string, password: string) {
    const user = await this.userService.authUser(username, password);
    if (!user) throw new UnauthorizedException();

    const payload = {
      id: user.id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
    };

    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
