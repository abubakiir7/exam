import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TransportService } from './transport.service';
import { CreateTransportDto } from './dto/create-transport.dto';
import { UpdateTransportDto } from './dto/update-transport.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('transport')
@Controller('transport')
export class TransportController {
  constructor(private readonly transportService: TransportService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The transport has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createTransportDto: CreateTransportDto) {
    return this.transportService.create(createTransportDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'List of all transports.' })
  findAll() {
    return this.transportService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'The found transport.' })
  @ApiResponse({ status: 404, description: 'Transport not found.' })
  findOne(@Param('id') id: string) {
    return this.transportService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Transport updated successfully.' })
  @ApiResponse({ status: 404, description: 'Transport not found.' })
  update(
    @Param('id') id: string,
    @Body() updateTransportDto: UpdateTransportDto,
  ) {
    return this.transportService.update(+id, updateTransportDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Transport deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Transport not found.' })
  remove(@Param('id') id: string) {
    return this.transportService.remove(+id);
  }
}
