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
exports.JourneyController = void 0;
const common_1 = require("@nestjs/common");
const journey_service_1 = require("./journey.service");
const create_journey_dto_1 = require("./dto/create-journey.dto");
const update_journey_dto_1 = require("./dto/update-journey.dto");
const booking_journey_dto_1 = require("./dto/booking-journey.dto");
let JourneyController = class JourneyController {
    constructor(journeyService) {
        this.journeyService = journeyService;
    }
    create(createJourneyDto) {
        return this.journeyService.create(createJourneyDto);
    }
    findAll() {
        return this.journeyService.findAll();
    }
    findOne(id) {
        return this.journeyService.findOne(+id);
    }
    update(id, updateJourneyDto) {
        return this.journeyService.update(+id, updateJourneyDto);
    }
    remove(id) {
        return this.journeyService.remove(+id);
    }
    booking(bookingDto) {
        return this.journeyService.book(bookingDto);
    }
};
exports.JourneyController = JourneyController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_journey_dto_1.CreateJourneyDto]),
    __metadata("design:returntype", void 0)
], JourneyController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], JourneyController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], JourneyController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_journey_dto_1.UpdateJourneyDto]),
    __metadata("design:returntype", void 0)
], JourneyController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], JourneyController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('booking'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [booking_journey_dto_1.BookingJourneyDto]),
    __metadata("design:returntype", void 0)
], JourneyController.prototype, "booking", null);
exports.JourneyController = JourneyController = __decorate([
    (0, common_1.Controller)('journey'),
    __metadata("design:paramtypes", [journey_service_1.JourneyService])
], JourneyController);
//# sourceMappingURL=journey.controller.js.map