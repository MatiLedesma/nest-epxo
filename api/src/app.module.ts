import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './adapters/api/user/user.controller';
import { UserService } from './domain/ports/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/model/user/user.entity';

@Module({
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
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule { }