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
exports.TripService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const trip_entity_1 = require("./entities/trip.entity");
const sequelize_2 = require("sequelize");
const console_1 = require("console");
const transport_entity_1 = require("../transport/entities/transport.entity");
const journey_entity_1 = require("../journey/entities/journey.entity");
let TripService = class TripService {
    constructor(tripRepo) {
        this.tripRepo = tripRepo;
    }
    async create(createTripDto) {
        return {
            status: 'success',
            message: 'created successfully',
            trip: await this.tripRepo.create(createTripDto),
        };
    }
    async findAllNotBeginRoutes() {
        const trips = await this.tripRepo.findAll({
            where: {
                beginning_time: { [sequelize_2.Op.gt]: new Date() },
            },
            include: [{ model: journey_entity_1.Journey }],
        });
        const journeys = trips.map(trip => trip.journey);
        (0, console_1.log)(journeys);
        if (trips.length)
            return {
                status: 'success',
                message: 'all not begin trips',
                journeys,
            };
        return {
            status: 'failed',
            message: 'there is no trips in row',
        };
    }
    async findTripsInActive() {
        const trips = await this.tripRepo.findAll({
            where: {
                [sequelize_2.Op.and]: [
                    { beginning_time: { [sequelize_2.Op.lt]: new Date() } },
                    { ending_time: { [sequelize_2.Op.gt]: new Date() } },
                ],
            },
            include: { all: true },
        });
        if (trips.length)
            return {
                status: 'success',
                message: 'all active trips',
                trips: await trips['journey'],
            };
        return {
            status: 'failed',
            message: 'there is no active trips',
        };
    }
    async findAll() {
        const trips = this.tripRepo.findAll({});
        if ((await trips).length)
            return {
                status: 'success',
                message: 'all trips',
                trips,
            };
        return {
            status: 'failed',
            message: 'there is no trips',
        };
    }
    async findOne(id) {
        const trip = await this.tripRepo.findByPk(+id);
        if (!trip)
            throw new common_1.BadRequestException('the id is not valid');
        return trip;
    }
    async update(id, updateTripDto) {
        return {
            status: 'success',
            message: 'updated successfully',
            trip: await this.tripRepo.update(updateTripDto, {
                where: { id },
                returning: true,
            }),
        };
    }
    async remove(id) {
        const deleted_trip = await this.tripRepo.findByPk(+id);
        await this.tripRepo.destroy({ where: { id } });
        return {
            status: 'success',
            message: 'deleted successfully',
            deleted_trip,
        };
    }
    async findTrip(findTripDto) {
        function convertToTimestamp(dateString) {
            return new Date(dateString).getTime();
        }
        async function getTripsInFormat() {
            try {
                const trips = await trip_entity_1.Trip.findAll({
                    include: { model: journey_entity_1.Journey, include: [transport_entity_1.Transport] },
                });
                const formattedTrips = trips.map((trip) => ({
                    id: trip.id,
                    origin: trip.from,
                    destination: trip.to,
                    departureDateTime: trip.beginning_time.toISOString(),
                    arrivalDateTime: trip.ending_time.toISOString(),
                    price: trip.price,
                    passangers: trip.passangers,
                    seats: trip.journey.transport.seats,
                    boarding: trip.boarding,
                }));
                return formattedTrips;
            }
            catch (error) {
                console.error('Error fetching trips:', error);
                throw error;
            }
        }
        let all_trips = await getTripsInFormat();
        const journey = {
            trips: all_trips,
            startDate: findTripDto.departing
                ? new Date(new Date(findTripDto.departing)).toISOString()
                : new Date().toISOString(),
        };
        async function planJourney(journey) {
            const { trips, startPoint, endPoint, startDate, passangers } = journey;
            if (!trips || trips.length === 0) {
                console.error('No trips provided.');
                return [];
            }
            const allRoutes = [];
            async function dfs(currentPoint, currentPath, currentTime, currentPrice, currentTripIds, lastTripArrival, totalWaitTimes, boardings) {
                if (currentPoint === endPoint) {
                    allRoutes.push({
                        path: currentPath.slice(),
                        price: currentPrice,
                        tripIds: currentTripIds.slice(),
                        transfers: totalWaitTimes.slice(),
                        boardings: boardings.slice(),
                    });
                    return;
                }
                const currentTimeStamp = convertToTimestamp(currentTime);
                for (const trip of trips) {
                    if (trip.origin === currentPoint) {
                        const departureTimeStamp = convertToTimestamp(trip.departureDateTime);
                        if (departureTimeStamp >= currentTimeStamp &&
                            trip.passangers + passangers <= trip.seats) {
                            const newPath = [...currentPath, trip.destination];
                            const newPrice = currentPrice + +trip.price;
                            const newTripIds = [
                                ...currentTripIds,
                                {
                                    id: trip.id,
                                    departureTime: trip.departureDateTime,
                                    arrivalTime: trip.arrivalDateTime,
                                },
                            ];
                            const newBoardings = [...boardings, trip.boarding];
                            let waitTime = '';
                            if (lastTripArrival !== null) {
                                const lastTripArrivalStamp = convertToTimestamp(lastTripArrival);
                                const waitTimeMillis = departureTimeStamp - lastTripArrivalStamp;
                                const days = Math.floor(waitTimeMillis / (1000 * 60 * 60 * 24));
                                const hours = Math.floor((waitTimeMillis % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                                const minutes = Math.floor((waitTimeMillis % (1000 * 60 * 60)) / (1000 * 60));
                                waitTime = `${days}d ${hours}h ${minutes}m`;
                                const isTransfer = (await trip_entity_1.Trip.findByPk(currentTripIds.at(-1).id)).journey_id !==
                                    (await trip_entity_1.Trip.findByPk(trip.id)).journey_id;
                                totalWaitTimes.push({ time: waitTime, isTransfer });
                            }
                            await dfs(trip.destination, newPath, trip.arrivalDateTime, newPrice, newTripIds, trip.arrivalDateTime, [...totalWaitTimes], newBoardings);
                        }
                    }
                }
            }
            await dfs(startPoint, [startPoint], startDate, 0, [], null, [], []);
            if (!startPoint || !endPoint)
                return;
            return allRoutes;
        }
        journey.startPoint = findTripDto.from;
        journey.endPoint = findTripDto.to;
        journey.passangers = findTripDto.passengers;
        if (!findTripDto.return) {
            journey.startPoint = findTripDto.from;
            journey.endPoint = findTripDto.to;
            const routes = await planJourney(journey);
            if (routes.length)
                return {
                    status: 'success',
                    message: 'all avaliable routes',
                    routes,
                };
            else
                return {
                    status: 'failed',
                    message: 'there is no avaliable routes',
                };
        }
        else {
            journey.startPoint = findTripDto.to;
            journey.endPoint = findTripDto.from;
            const returning_routes = await planJourney(journey);
            if (returning_routes) {
                journey.startPoint = findTripDto.from;
                journey.endPoint = findTripDto.to;
                const routes = await planJourney(journey);
                if (routes.length)
                    return {
                        status: 'success',
                        message: 'all avaliable routes',
                        routes,
                    };
                else
                    return {
                        status: 'failed',
                        message: 'there is no avaliable routes',
                    };
            }
            else
                return {
                    status: 'failed',
                    message: 'there is no avaliable routes',
                };
        }
    }
};
exports.TripService = TripService;
exports.TripService = TripService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(trip_entity_1.Trip)),
    __metadata("design:paramtypes", [Object])
], TripService);
//# sourceMappingURL=trip.service.js.map