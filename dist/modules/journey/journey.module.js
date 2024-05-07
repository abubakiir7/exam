"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JourneyModule = void 0;
const common_1 = require("@nestjs/common");
const journey_service_1 = require("./journey.service");
const journey_controller_1 = require("./journey.controller");
const sequelize_1 = require("@nestjs/sequelize");
const journey_entity_1 = require("./entities/journey.entity");
const trip_module_1 = require("../trip/trip.module");
const user_entity_1 = require("../user/entities/user.entity");
const tickets_module_1 = require("../tickets/tickets.module");
const transport_entity_1 = require("../transport/entities/transport.entity");
const user_module_1 = require("../user/user.module");
const mail_module_1 = require("../mail/mail.module");
let JourneyModule = class JourneyModule {
};
exports.JourneyModule = JourneyModule;
exports.JourneyModule = JourneyModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([journey_entity_1.Journey, user_entity_1.User, transport_entity_1.Transport]), trip_module_1.TripModule, tickets_module_1.TicketsModule, mail_module_1.MailModule, user_module_1.UserModule],
        controllers: [journey_controller_1.JourneyController],
        providers: [journey_service_1.JourneyService],
    })
], JourneyModule);
//# sourceMappingURL=journey.module.js.map