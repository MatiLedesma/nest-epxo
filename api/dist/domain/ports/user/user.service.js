"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../model/user/user.entity");
const typeorm_2 = require("typeorm");
let UserService = exports.UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getAll() {
        const responseDto = [];
        const response = await this.userRepository.find();
        response.map((r, i) => { delete r.password; responseDto[i] = r; });
        return responseDto;
    }
    async getById(id) {
        try {
            var responseDto;
            const response = await this.userRepository.findOneBy({ id });
            delete response.password;
            responseDto = response;
            return responseDto;
        }
        catch (e) {
            throw new common_1.HttpException("Cannot get the requested id", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async create(user) {
        var responseDto;
        const response = await this.userRepository.save(user);
        delete response.password;
        responseDto = response;
        return responseDto;
    }
    async delete(id) {
        const result = await this.userRepository.delete(id);
        if (result.affected === 0)
            throw new common_1.HttpException("The id does not exist", common_1.HttpStatus.NOT_FOUND);
        return "Successfully deleted with id: " + id;
    }
};
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map