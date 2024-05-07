import { JourneyService } from './journey.service';
import { CreateJourneyDto } from './dto/create-journey.dto';
import { UpdateJourneyDto } from './dto/update-journey.dto';
import { BookingJourneyDto } from './dto/booking-journey.dto';
export declare class JourneyController {
    private readonly journeyService;
    constructor(journeyService: JourneyService);
    create(createJourneyDto: CreateJourneyDto): Promise<{
        status: string;
        message: string;
        journey?: undefined;
    } | {
        status: string;
        message: string;
        journey: import("src/modules/journey/entities/journey.entity").Journey;
    }>;
    findAll(): Promise<{
        status: string;
        message: string;
        journeys: import("src/modules/journey/entities/journey.entity").Journey[];
    } | {
        status: string;
        message: string;
        journeys?: undefined;
    }>;
    findOne(id: string): Promise<import("src/modules/journey/entities/journey.entity").Journey>;
    update(id: string, updateJourneyDto: UpdateJourneyDto): string;
    remove(id: string): Promise<{
        status: string;
        message: string;
        deleted_trip: import("src/modules/journey/entities/journey.entity").Journey;
    }>;
    booking(bookingDto: BookingJourneyDto): Promise<{
        status: string;
        message: string;
        messgae?: undefined;
        tickets?: undefined;
    } | {
        status: string;
        messgae: string;
        message?: undefined;
        tickets?: undefined;
    } | {
        status: string;
        message: string;
        tickets: any[];
        messgae?: undefined;
    }>;
}
