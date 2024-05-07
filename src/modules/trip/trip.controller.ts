import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TripService } from './trip.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { FindTripDto } from './dto/find-trip.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('trip')
@Controller('trip')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The trip has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createTripDto: CreateTripDto) {
    return this.tripService.create(createTripDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'List of all trips.' })
  findAll() {
    return this.tripService.findAll();
  }

  @Get('finding-all-not-begun-routes')
  @ApiResponse({
    status: 200,
    description: 'List of all trips with routes not yet begun.',
  })
  findAllNotBeginRoutes() {
    return this.tripService.findAllNotBeginRoutes();
  }

  @Get('finding-active-routes')
  @ApiResponse({
    status: 200,
    description: 'List of all trips with active routes.',
  })
  findTripsInActive() {
    return this.tripService.findTripsInActive();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'The found trip.' })
  @ApiResponse({ status: 404, description: 'Trip not found.' })
  findOne(@Param('id') id: string) {
    return this.tripService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Trip updated successfully.' })
  @ApiResponse({ status: 404, description: 'Trip not found.' })
  update(@Param('id') id: string, @Body() updateTripDto: UpdateTripDto) {
    return this.tripService.update(+id, updateTripDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Trip deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Trip not found.' })
  remove(@Param('id') id: string) {
    return this.tripService.remove(+id);
  }

  @Post('find-trip')
  @ApiResponse({ status: 200, description: 'The found trip.' })
  @ApiResponse({ status: 404, description: 'Trip not found.' })
  findTrip(@Body() findTripDto: FindTripDto) {
    return this.tripService.findTrip(findTripDto);
  }
}
