import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../../../domain/ports/user/user.service';
import { UserResponseDto } from './dto/user.response.dto';
import { UserRequestDto } from './dto/user.request.dto';
import { JwtAuthGuard } from 'src/config/jwt/jwt-guard.auth';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';

@ApiTags("user")
@Controller('api/user')
export class UserController {
  constructor(private readonly usersService: UserService) { }

  @Post()
  async create(@Body() user: UserRequestDto): Promise<UserResponseDto> {
    return this.usersService.create(user);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getAll(): Promise<UserResponseDto[]> {
    return this.usersService.getAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getById(@Param('id') id: string): Promise<UserResponseDto> {
    return this.usersService.getById(Number(id));
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string): Promise<string> {
    return this.usersService.delete(Number(id));
  }
}
