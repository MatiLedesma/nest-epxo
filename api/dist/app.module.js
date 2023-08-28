"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_controller_1 = require("./adapters/api/user/user.controller");
const user_service_1 = require("./domain/ports/user/user.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./domain/model/user/user.entity");
const auth_controller_1 = require("./adapters/api/auth/auth.controller");
const auth_service_1 = require("./domain/ports/auth/auth.service");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const configuration_1 = require("./config/global/configuration");
const passport_1 = require("@nestjs/passport");
const jwt_strategy_1 = require("./config/jwt/jwt.strategy");
const core_1 = require("@nestjs/core");
const validation_pipe_1 = require("./config/validation.pipe");
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: configuration_1.configuration.database.name,
                password: configuration_1.configuration.database.password,
                database: configuration_1.configuration.database.schema,
                autoLoadEntities: true,
                synchronize: true,
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
            jwt_1.JwtModule.register({
                global: true,
                secret: configuration_1.configuration.secret,
                signOptions: { expiresIn: '1h' },
            }),
            config_1.ConfigModule.forRoot({ envFilePath: '.env' }),
            passport_1.PassportModule,
        ],
        controllers: [app_controller_1.AppController, user_controller_1.UserController, auth_controller_1.AuthController],
        providers: [app_service_1.AppService, user_service_1.UserService, auth_service_1.AuthService, jwt_strategy_1.JwtStrategy, {
                provide: core_1.APP_PIPE,
                useClass: validation_pipe_1.ValidationPipe,
            },],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map