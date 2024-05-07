import { CreateJourneyDto } from './dto/create-journey.dto';
import { UpdateJourneyDto } from './dto/update-journey.dto';
import { Journey } from './entities/journey.entity';
import { TripService } from '../trip/trip.service';
import { User } from '../user/entities/user.entity';
import { BookingJourneyDto } from './dto/booking-journey.dto';
import { TicketsService } from '../tickets/tickets.service';
import { Transport } from '../transport/entities/transport.entity';
import { MailService } from '../mail/mail.service';
import { UserService } from '../user/user.service';
export declare class JourneyService {
    private journeyRepo;
    private readonly tripService;
    private userRepo;
    private readonly ticketService;
    private readonly transportRepo;
    private readonly mailService;
    private readonly userService;
    constructor(journeyRepo: typeof Journey, tripService: TripService, userRepo: typeof User, ticketService: TicketsService, transportRepo: typeof Transport, mailService: MailService, userService: UserService);
    create(createJourneyDto: CreateJourneyDto): Promise<{
        status: string;
        message: string;
        journey?: undefined;
    } | {
        status: string;
        message: string;
        journey: Journey;
    }>;
    findAll(): Promise<{
        status: string;
        message: string;
        journeys: Journey[];
    } | {
        status: string;
        message: string;
        journeys?: undefined;
    }>;
    findOne(id: number): Promise<Journey>;
    update(id: number, updateJourneyDto: UpdateJourneyDto): string;
    remove(id: number): Promise<{
        status: string;
        message: string;
        deleted_trip: Journey;
    }>;
    book(bookingDto: BookingJourneyDto): Promise<{
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
