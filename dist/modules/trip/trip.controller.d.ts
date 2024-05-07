import { TripService } from './trip.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { FindTripDto } from './dto/find-trip.dto';
export declare class TripController {
    private readonly tripService;
    constructor(tripService: TripService);
    create(createTripDto: CreateTripDto): Promise<{
        status: string;
        message: string;
        trip: import("src/modules/trip/entities/trip.entity").Trip;
    }>;
    findAll(): Promise<{
        status: string;
        message: string;
        trips: Promise<import("src/modules/trip/entities/trip.entity").Trip[]>;
    } | {
        status: string;
        message: string;
        trips?: undefined;
    }>;
    findAllNotBeginRoutes(): Promise<{
        status: string;
        message: string;
        journeys: import("src/modules/journey/entities/journey.entity").Journey[];
    } | {
        status: string;
        message: string;
        journeys?: undefined;
    }>;
    findTripsInActive(): Promise<{
        status: string;
        message: string;
        trips: any;
    } | {
        status: string;
        message: string;
        trips?: undefined;
    }>;
    findOne(id: string): Promise<import("src/modules/trip/entities/trip.entity").Trip>;
    update(id: string, updateTripDto: UpdateTripDto): Promise<{
        status: string;
        message: string;
        trip: [affectedCount: number, affectedRows: import("src/modules/trip/entities/trip.entity").Trip[]];
    }>;
    remove(id: string): Promise<{
        status: string;
        message: string;
        deleted_trip: import("src/modules/trip/entities/trip.entity").Trip;
    }>;
    findTrip(findTripDto: FindTripDto): Promise<{
        status: string;
        message: string;
        routes: {
            path: string[];
            price: number;
            tripIds: any;
            transfers?: any;
            boardings: number[];
        }[];
    } | {
        status: string;
        message: string;
        routes?: undefined;
    }>;
}
