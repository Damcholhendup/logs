import { LogsService } from './logs.service';
import { CreateLogDto } from './dto/create-log.dto';
export declare class LogsController {
    private readonly logsService;
    constructor(logsService: LogsService);
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
    delete(ticketNumber: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
