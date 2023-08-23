import { Body, Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { UserService } from '../../../domain/ports/user/user.service';
import { UserResponseDto } from './dto/user.response.dto';
import { UserRequestDto } from './dto/user.request.dto';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  async create(@Body() user: UserRequestDto): Promise<UserResponseDto> {
    return this.usersService.create(user);
  }

  @Get()
  async getAll(): Promise<UserResponseDto[]> {
    return this.usersService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<UserResponseDto> {
    return this.usersService.getById(Number(id));
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<string> {
    return this.usersService.delete(Number(id));
  }
}
