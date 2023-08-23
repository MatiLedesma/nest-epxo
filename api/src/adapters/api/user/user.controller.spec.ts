import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../../../domain/ports/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../../domain/model/user/user.entity';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { UserResponseDto } from './dto/user.response.dto';

describe('UserController', () => {
  let app: INestApplication;

  let controller: UserController;
  let service: UserService;

  beforeAll(async () => {
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
          entities: [User],
          synchronize: true
        }),
        TypeOrmModule.forFeature([User])
      ]
    }).compile();

    service = module.get<UserService>(UserService);
    controller = module.get<UserController>(UserController);
    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it("GET `/user` should return 200", () => {
    return request(app.getHttpServer())
      .get('/user')
      .expect(200)
      .then(({ body }) => {
        console.log(body);
        expect(body).toBeInstanceOf(Array<UserResponseDto[]>);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
