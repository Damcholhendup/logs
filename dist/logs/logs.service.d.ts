import { PrismaService } from '../prisma/prisma.service';
import { CreateLogDto } from './dto/create-log.dto';
export declare class LogsService {
    private readonly prisma;
    private readonly uploadDir;
    constructor(prisma: PrismaService);
    saveFile(file: Express.Multer.File): Promise<string>;
    create(createLogDto: CreateLogDto): Promise<{
        ticketNumber: string;
    }>;
    findAll(): Promise<{
        errorCode: number | null;
        errorMessage: string;
        timestamp: Date;
        deviceInfo: string;
        errorTitle: string;
        userDescription: string;
        stackTraceReport: string | null;
        ticketNumber: string;
        id: number;
    }[]>;
    findByTicketNumber(ticketNumber: string): Promise<{
        errorCode: number | null;
        errorMessage: string;
        timestamp: Date;
        deviceInfo: string;
        errorTitle: string;
        userDescription: string;
        stackTraceReport: string | null;
        ticketNumber: string;
        id: number;
    }>;
    deleteByTicketNumber(ticketNumber: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
    getStackTraceReport(ticketNumber: string): Promise<string>;
}
