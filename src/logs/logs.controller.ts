/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { LogsService } from './logs.service';
import { CreateLogDto } from './dto/create-log.dto';

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Post()
  async create(@Body() createLogDto: CreateLogDto) {
    return this.logsService.create(createLogDto);
  }

  @Get()
  async findAll() {
    return this.logsService.findAll();
  }

  @Get(':ticketNumber')
  async findByTicketNumber(@Param('ticketNumber') ticketNumber: string) {
    return this.logsService.findByTicketNumber(ticketNumber);
  }

  @Delete(':ticketNumber')
  async delete(@Param('ticketNumber') ticketNumber: string) {
    return this.logsService.deleteByTicketNumber(ticketNumber);
  }




}
