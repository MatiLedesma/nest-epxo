import { UserRequestDto } from 'src/adapters/api/user/dto/user.request.dto';
import { UserResponseDto } from 'src/adapters/api/user/dto/user.response.dto';
import { User } from '../../model/user/user.entity';
import { Repository } from 'typeorm';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    getAll(): Promise<UserResponseDto[]>;
    authUser(username: string, password: string): Promise<UserResponseDto>;
    getById(id: number): Promise<UserResponseDto>;
    create(user: UserRequestDto): Promise<UserResponseDto>;
    delete(id: number): Promise<string>;
}
