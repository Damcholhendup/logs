import { PrismaService } from '../prisma/prisma.service';
import { CreateLogDto } from './dto/create-log.dto';
export declare class LogsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createLogDto: CreateLogDto): Promise<{
        ticketNumber: string;
    }>;
    findAll(): Promise<{
        errorCode: number;
        errorMessage: string;
        timestamp: Date;
        deviceInfo: string;
        errorTitle: string;
        userDescription: string;
        ticketNumber: string;
        id: number;
    }[]>;
    findByTicketNumber(ticketNumber: string): Promise<{
        errorCode: number;
        errorMessage: string;
        timestamp: Date;
        deviceInfo: string;
        errorTitle: string;
        userDescription: string;
        ticketNumber: string;
        id: number;
    }[]>;
    deleteByTicketNumber(ticketNumber: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
