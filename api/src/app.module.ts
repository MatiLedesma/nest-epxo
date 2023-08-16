import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './adapters/api/user/user.controller';
import { UserService } from './domain/ports/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/model/user/user.entity';
import { PersonaService } from './domain/ports/persona/persona.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [__dirname + "/domain/model/**/*.entity{.ts,.js}"],
      synchronize: true,
    }), TypeOrmModule.forFeature([User])
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, PersonaService],
})
export class AppModule { }