import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/domain/ports/auth/auth.service';
import { AuthRequestDto } from './dto/auth.request.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("auth")
@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  async signIn(@Body() authRequestDto: AuthRequestDto): Promise<{ access_token: string }> {
    return this.authService.singIn(
      authRequestDto.email,
      authRequestDto.password,
    );
  }
}
