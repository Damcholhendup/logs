/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLogDto } from './dto/create-log.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LogsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createLogDto: CreateLogDto) {
    const { errorCode, errorMessage, timestamp, deviceInfo, errorTitle, userDescription } = createLogDto;

    // Get the current date in YYYYMMDD format
    const datePrefix = new Date().toISOString().slice(0, 10).replace(/-/g, '');

    // Generate a unique identifier 
    const uniqueSuffix = uuidv4().substring(0, 6).toUpperCase();

    // Combine the date prefix and unique suffix to create the ticket number
    const ticketNumber = `${datePrefix}-${uniqueSuffix}`;

    // Save the log with the generated ticket number
    await this.prisma.log.create({
      data: {
        ticketNumber,
        errorCode,
        errorMessage,
        timestamp,
        deviceInfo,
        errorTitle,
        userDescription,
      },
    });

    // Return only the ticket number to the wallet
    return {
      ticketNumber,
    };
  }

  async findAll() {
    return this.prisma.log.findMany();
  }

  async findByTicketNumber(ticketNumber: string) {
    return this.prisma.log.findMany({
      where: { ticketNumber },
    });
  }

  async deleteByTicketNumber(ticketNumber: string) {
    return this.prisma.log.deleteMany({
      where: { ticketNumber },
    });
  }
}
