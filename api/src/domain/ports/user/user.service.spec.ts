import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from '../../model/user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
