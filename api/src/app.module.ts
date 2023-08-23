import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './adapters/api/user/user.controller';
import { UserService } from './domain/ports/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/model/user/user.entity';
import { AuthController } from './adapters/api/auth/auth.controller';
import { AuthService } from './domain/ports/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './config/global/configuration';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './config/jwt/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: configuration.database.name,
      password: configuration.database.password,
      database: configuration.database.schema,
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: configuration.secret,
      signOptions: { expiresIn: '1h' },
    }),
    ConfigModule.forRoot({ envFilePath: '.env' }),
    PassportModule,
  ],
  controllers: [AppController, UserController, AuthController],
  providers: [AppService, UserService, AuthService, JwtStrategy],
})
export class AppModule {}
