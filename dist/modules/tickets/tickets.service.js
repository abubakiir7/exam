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
exports.TicketsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const ticket_entity_1 = require("./entities/ticket.entity");
const uuid_1 = require("uuid");
let TicketsService = class TicketsService {
    constructor(ticketRepo) {
        this.ticketRepo = ticketRepo;
    }
    async create(createTicketDto) {
        createTicketDto.ticket_unique_id = (0, uuid_1.v4)();
        const ticket = await this.ticketRepo.create(createTicketDto);
        if (createTicketDto.email) {
        }
        return ticket;
    }
    findAll() {
        return `This action returns all tickets`;
    }
    findOne(id) {
        return `This action returns a #${id} ticket`;
    }
    update(id, updateTicketDto) {
        return `This action updates a #${id} ticket`;
    }
    remove(id) {
        return `This action removes a #${id} ticket`;
    }
};
exports.TicketsService = TicketsService;
exports.TicketsService = TicketsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(ticket_entity_1.Ticket)),
    __metadata("design:paramtypes", [Object])
], TicketsService);
//# sourceMappingURL=tickets.service.js.map