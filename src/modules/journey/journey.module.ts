import { Module } from '@nestjs/common';
import { JourneyService } from './journey.service';
import { JourneyController } from './journey.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Journey } from './entities/journey.entity';
import { TripModule } from '../trip/trip.module';
import { User } from '../user/entities/user.entity';
import { TicketsModule } from '../tickets/tickets.module';
import { Transport } from '../transport/entities/transport.entity';
import { MailService } from '../mail/mail.service';
import { UserModule } from '../user/user.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [SequelizeModule.forFeature([Journey, User, Transport]), TripModule, TicketsModule, MailModule, UserModule],
  controllers: [JourneyController],
  providers: [JourneyService],
})
export class JourneyModule {}
