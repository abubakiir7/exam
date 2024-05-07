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
exports.TransportController = void 0;
const common_1 = require("@nestjs/common");
const transport_service_1 = require("./transport.service");
const create_transport_dto_1 = require("./dto/create-transport.dto");
const update_transport_dto_1 = require("./dto/update-transport.dto");
const swagger_1 = require("@nestjs/swagger");
let TransportController = class TransportController {
    constructor(transportService) {
        this.transportService = transportService;
    }
    create(createTransportDto) {
        return this.transportService.create(createTransportDto);
    }
    findAll() {
        return this.transportService.findAll();
    }
    findOne(id) {
        return this.transportService.findOne(+id);
    }
    update(id, updateTransportDto) {
        return this.transportService.update(+id, updateTransportDto);
    }
    remove(id) {
        return this.transportService.remove(+id);
    }
};
exports.TransportController = TransportController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The transport has been successfully created.',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_transport_dto_1.CreateTransportDto]),
    __metadata("design:returntype", void 0)
], TransportController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of all transports.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TransportController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The found transport.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Transport not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TransportController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Transport updated successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Transport not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_transport_dto_1.UpdateTransportDto]),
    __metadata("design:returntype", void 0)
], TransportController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Transport deleted successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Transport not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TransportController.prototype, "remove", null);
exports.TransportController = TransportController = __decorate([
    (0, swagger_1.ApiTags)('transport'),
    (0, common_1.Controller)('transport'),
    __metadata("design:paramtypes", [transport_service_1.TransportService])
], TransportController);
//# sourceMappingURL=transport.controller.js.map