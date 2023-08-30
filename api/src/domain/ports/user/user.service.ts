import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRequestDto } from 'src/adapters/api/user/dto/user.request.dto';
import { UserResponseDto } from 'src/adapters/api/user/dto/user.response.dto';
import { User } from '../../model/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) { }

  async getAll(): Promise<UserResponseDto[]> {
    const responseDto: UserResponseDto[] = [];
    const response = await this.userRepository.find();

    if (!response)
      throw new HttpException('Cannot get all users', HttpStatus.INTERNAL_SERVER_ERROR);

    response.map((r, i) => {
      delete r.password;
      responseDto[i] = r;
    });
    return responseDto;
  }

  async authUser(username: string, password: string): Promise<UserResponseDto> {

    const response = await this.userRepository.findOne({
      where: { email: username, password: password },
    });

    if (!response)
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);

    delete response.password;
    const responseDto: UserResponseDto = response;

    return responseDto;
  }

  async getById(id: number): Promise<UserResponseDto> {

    const response = await this.userRepository.findOneBy({ id });

    if (!response)
      throw new HttpException(
        'User not found',
        HttpStatus.NOT_FOUND,
      );

    delete response.password;
    const responseDto: UserResponseDto = response;

    return responseDto;
  }

  async create(user: UserRequestDto): Promise<UserResponseDto> {
    const response = await this.userRepository.save(user);
    delete response.password;
    const responseDto: UserResponseDto = response;

    return responseDto;
  }

  async delete(id: number): Promise<string> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return `Successfully deleted id: ${id}`;
  }
}
