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
exports.JourneyService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const journey_entity_1 = require("./entities/journey.entity");
const trip_service_1 = require("../trip/trip.service");
const sequelize_2 = require("sequelize");
const user_entity_1 = require("../user/entities/user.entity");
const trip_entity_1 = require("../trip/entities/trip.entity");
const tickets_service_1 = require("../tickets/tickets.service");
const console_1 = require("console");
const transport_entity_1 = require("../transport/entities/transport.entity");
const sequelize_typescript_1 = require("sequelize-typescript");
const mail_service_1 = require("../mail/mail.service");
const user_service_1 = require("../user/user.service");
let JourneyService = class JourneyService {
    constructor(journeyRepo, tripService, userRepo, ticketService, transportRepo, mailService, userService) {
        this.journeyRepo = journeyRepo;
        this.tripService = tripService;
        this.userRepo = userRepo;
        this.ticketService = ticketService;
        this.transportRepo = transportRepo;
        this.mailService = mailService;
        this.userService = userService;
    }
    async create(createJourneyDto) {
        const { trips, transport_id } = createJourneyDto;
        if (!(await this.transportRepo.findByPk(transport_id)))
            return { status: 'failed', message: 'the transport not cretaed yet' };
        const beginning = trips[0].beginning_time;
        const ending = trips[trips.length - 1].ending_time;
        const busyJourneys = await Promise.all(trips.map(async (trip) => {
            return await this.journeyRepo.findAll({
                where: {
                    transport_id,
                    beginning_time: { [sequelize_2.Op.lt]: ending },
                    ending_time: { [sequelize_2.Op.gt]: beginning },
                },
            });
        }));
        if (busyJourneys.some((journeys) => journeys.length > 0)) {
            return {
                status: 'failed',
                message: 'The transport is busy at those times',
            };
        }
        const journeyCreation = {
            origin: trips[0].from,
            destination: trips[trips.length - 1].to,
            beginning_time: beginning,
            ending_time: ending,
            transport_id: transport_id,
        };
        const journey = await this.journeyRepo.create(journeyCreation, {
            returning: true,
        });
        await Promise.all(trips.map((trip) => {
            return this.tripService.create({ ...trip, journey_id: journey.id });
        }));
        return {
            status: 'success',
            message: 'Journey created successfully',
            journey,
        };
    }
    async findAll() {
        const journeys = await this.journeyRepo.findAll({ include: { all: true } });
        if (journeys.length)
            return {
                status: 'success',
                message: 'all trips',
                journeys,
            };
        return {
            status: 'failed',
            message: 'there is no trips',
        };
    }
    async findOne(id) {
        const journey = await this.journeyRepo.findByPk(+id);
        if (!journey)
            throw new common_1.BadRequestException('the id is not valid');
        return journey;
    }
    update(id, updateJourneyDto) {
        return `This action updates a #${id} journey`;
    }
    async remove(id) {
        const deleted_trip = await this.journeyRepo.findByPk(+id, {
            include: { all: true },
        });
        await this.journeyRepo.destroy({ where: { id } });
        return {
            status: 'success',
            message: 'deleted successfully',
            deleted_trip,
        };
    }
    async book(bookingDto) {
        const tickets = [];
        for (let ind = 0; ind < bookingDto.passangers.length; ind++) {
            const TRIPS = bookingDto.passangers[ind].trip_ids.map((i) => i[0]);
            if (!(await this.journeyRepo.findAll({ where: { id: TRIPS } })))
                return {
                    status: 'failed',
                    message: 'the trip was deleted',
                };
            if (!(await this.userRepo.findByPk(bookingDto.user_id))?.phone)
                return {
                    status: 'failed',
                    messgae: 'phone number required to book',
                };
            const trips = await trip_entity_1.Trip.findAll({
                where: { id: TRIPS },
                include: { model: journey_entity_1.Journey, include: [transport_entity_1.Transport] },
            });
            if (trips.length != TRIPS.length)
                return {
                    status: "failed",
                    message: "there is no such a trip"
                };
            (0, console_1.log)(trips[0].seats);
            let shouldReturn = false;
            for (let ind = 0; ind < bookingDto.passangers.length; ind++) {
                const passenger = bookingDto.passangers[ind];
                for (let index = 0; index < passenger.trip_ids.length; index++) {
                    const trip = trips[index];
                    const seatsToCheck = passenger.trip_ids[index][1];
                    for (const seatToCheck of seatsToCheck) {
                        if (trip.journey.transport.seats < 1 + trip.passangers ||
                            trip.seats?.includes(seatToCheck)) {
                            shouldReturn = true;
                            break;
                        }
                    }
                    if (shouldReturn) {
                        break;
                    }
                }
                if (shouldReturn) {
                    break;
                }
            }
            if (shouldReturn) {
                return {
                    status: 'failed',
                    message: 'There are not enough seats available or the seat is already booked.',
                };
            }
            const creation_ticket = {
                user_id: bookingDto.user_id,
                first_name: bookingDto.passangers[ind].first_name,
                last_name: bookingDto.passangers[ind].last_name,
                phone: bookingDto.passangers[ind].phone,
                email: bookingDto.passangers[ind].email
                    ? bookingDto.passangers[ind].email
                    : undefined,
                trip_ids: [],
                seat_ids: [],
            };
            creation_ticket.trip_ids.push(...TRIPS);
            creation_ticket.seat_ids.push(...bookingDto.passangers[ind].trip_ids.map((k) => k[1]));
            const ticket = await this.ticketService.create(creation_ticket);
            tickets.push({
                ticket,
            });
            for (let g = 0; g < ticket.trip_ids.length; g++) {
                await trip_entity_1.Trip.update({
                    seats: sequelize_typescript_1.Sequelize.literal(`seats || ARRAY[${ticket.seat_ids[g]}]`),
                }, { where: { id: ticket.trip_ids[g] } });
            }
        }
        const user = await this.userService.findOne(bookingDto.user_id);
        this.mailService.sendMailClient("smart", user.email, { name: user.lastName + ' ' + user.firstName });
        return {
            status: 'success',
            message: 'ticket booked successfully',
            tickets,
        };
    }
};
exports.JourneyService = JourneyService;
exports.JourneyService = JourneyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(journey_entity_1.Journey)),
    __param(2, (0, sequelize_1.InjectModel)(user_entity_1.User)),
    __param(4, (0, sequelize_1.InjectModel)(transport_entity_1.Transport)),
    __metadata("design:paramtypes", [Object, trip_service_1.TripService, Object, tickets_service_1.TicketsService, Object, mail_service_1.MailService,
        user_service_1.UserService])
], JourneyService);
//# sourceMappingURL=journey.service.js.map