import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { Trip } from './entities/trip.entity';
import { FindTripDto } from './dto/find-trip.dto';
import { Journey } from '../journey/entities/journey.entity';
export declare class TripService {
    private tripRepo;
    constructor(tripRepo: typeof Trip);
    create(createTripDto: CreateTripDto): Promise<{
        status: string;
        message: string;
        trip: Trip;
    }>;
    findAllNotBeginRoutes(): Promise<{
        status: string;
        message: string;
        journeys: Journey[];
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
    findAll(): Promise<{
        status: string;
        message: string;
        trips: Promise<Trip[]>;
    } | {
        status: string;
        message: string;
        trips?: undefined;
    }>;
    findOne(id: number): Promise<Trip>;
    update(id: number, updateTripDto: UpdateTripDto): Promise<{
        status: string;
        message: string;
        trip: [affectedCount: number, affectedRows: Trip[]];
    }>;
    remove(id: number): Promise<{
        status: string;
        message: string;
        deleted_trip: Trip;
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
