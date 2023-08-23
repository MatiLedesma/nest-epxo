import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../../../domain/ports/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../../domain/model/user/user.entity';
import { NestApplication } from '@nestjs/core';

describe('UserController', () => {
  let app: NestApplication;

  let controller: UserController;
  let service: UserService;
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
          entities: [__dirname + '/domain/model/**/*.entity{.ts,.js}'],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([User]),
      ],
    }).compile();

    app = module.createNestApplication();
    service = module.get<UserService>(UserService);
    controller = module.get<UserController>(UserController);
    app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  // if('')

  afterAll(async () => {
    await app.close();
  });
});
