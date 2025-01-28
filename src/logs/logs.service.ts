/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLogDto } from './dto/create-log.dto';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LogsService {
  private readonly uploadDir = './uploads/stacktraces';

  constructor(private readonly prisma: PrismaService) {
    // Ensure the upload directory exists
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async saveFile(file: Express.Multer.File): Promise<string> {
    const fileName = `${uuidv4()}-${file.originalname}`;
    const filePath = path.join(this.uploadDir, fileName);

    fs.writeFileSync(filePath, file.buffer);

    console.log(`File saved at: ${filePath}`);
    return filePath; // Return the relative path
  }

  async create(createLogDto: CreateLogDto) {
    const { errorCode, errorMessage, timestamp, deviceInfo, errorTitle, userDescription, stackTraceReport } = createLogDto;

    const datePrefix = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const uniqueSuffix = uuidv4().substring(0, 6).toUpperCase();
    const ticketNumber = `${datePrefix}-${uniqueSuffix}`;

    await this.prisma.log.create({
      data: {
        ticketNumber,
        errorCode,
        errorMessage,
        timestamp,
        deviceInfo,
        errorTitle,
        userDescription,
        stackTraceReport, // Save the file path or URL
      },
    });

    return { ticketNumber };
  }

  async findAll() {
    return this.prisma.log.findMany();
  }

  async findByTicketNumber(ticketNumber: string) {
    return this.prisma.log.findFirst({
      where: { ticketNumber },
    });
  }

  async deleteByTicketNumber(ticketNumber: string) {
    return this.prisma.log.deleteMany({
      where: { ticketNumber },
    });
  }

  async getStackTraceReport(ticketNumber: string): Promise<string> {
    const log = await this.prisma.log.findUnique({
      where: { ticketNumber },
      select: { stackTraceReport: true },
    });

    if (!log || !log.stackTraceReport) {
      throw new Error('Stack trace not found for the provided ticket number');
    }

    return log.stackTraceReport; // Return the saved file path
  }
}
