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
  ) {}

  async getAll(): Promise<UserResponseDto[]> {
    const responseDto: UserResponseDto[] = [];
    const response = await this.userRepository.find();
    response.map((r, i) => {
      delete r.password;
      responseDto[i] = r;
    });
    return responseDto;
  }

  async getById(id: number): Promise<UserResponseDto> {
    try {
      const response = await this.userRepository.findOneBy({ id });
      delete response.password;
      const responseDto: UserResponseDto = response;

      return responseDto;
    } catch (e) {
      throw new HttpException(
        'Cannot get the requested id',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
      throw new HttpException('The id does not exist', HttpStatus.NOT_FOUND);
    return 'Successfully deleted with id: ' + id;
  }
}
