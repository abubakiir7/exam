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
exports.TransportService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const transport_entity_1 = require("./entities/transport.entity");
const seats_entity_1 = require("./entities/seats.entity");
let TransportService = class TransportService {
    constructor(transportRepo, seatRepo) {
        this.transportRepo = transportRepo;
        this.seatRepo = seatRepo;
    }
    async create(createTransportDto) {
        createTransportDto.seats = createTransportDto.column * createTransportDto.raw;
        const response = {
            status: 'success',
            message: 'transport created successfully',
            transport: await this.transportRepo.create(createTransportDto),
        };
        for (let i = 0; i < response.transport.raw * response.transport.column; i++)
            this.seatRepo.create({ transport_id: response.transport.id });
        return response;
    }
    async findAll() {
        const transport = await this.transportRepo.findAll({
            include: { all: true },
        });
        if (transport)
            return {
                status: 'success',
                message: 'fetched transports',
                transport,
            };
        return {
            status: 'failed',
            message: 'there is no transports',
        };
    }
    findOne(id) {
        return `This action returns a #${id} transport`;
    }
    update(id, updateTransportDto) {
        return `This action updates a #${id} transport`;
    }
    remove(id) {
        return `This action removes a #${id} transport`;
    }
};
exports.TransportService = TransportService;
exports.TransportService = TransportService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(transport_entity_1.Transport)),
    __param(1, (0, sequelize_1.InjectModel)(seats_entity_1.Seats)),
    __metadata("design:paramtypes", [Object, Object])
], TransportService);
//# sourceMappingURL=transport.service.js.map