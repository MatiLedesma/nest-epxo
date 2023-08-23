import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from 'src/domain/ports/user/user.service';
import { User } from 'src/domain/model/user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'root',
          database: 'nest',
          entities: [__dirname + "/domain/model/**/*.entity{.ts,.js}"],
          synchronize: true,
        }), TypeOrmModule.forFeature([User])
      ]
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
