import { UserService } from 'src/domain/ports/user/user.service';
import { UserResponseDto } from './dto/user.response.dto';
import { UserRequestDto } from './dto/user.request.dto';
export declare class UserController {
    private readonly usersService;
    constructor(usersService: UserService);
    create(user: UserRequestDto): Promise<UserResponseDto>;
    getAll(): Promise<UserResponseDto[]>;
    getById(id: string): Promise<UserResponseDto>;
    delete(id: string): Promise<string>;
}
