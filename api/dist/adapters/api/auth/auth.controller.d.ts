import { AuthService } from 'src/domain/ports/auth/auth.service';
import { AuthRequestDto } from './dto/AuthRequestDto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signIn(authRequestDto: AuthRequestDto): Promise<{
        access_token: string;
    }>;
}
