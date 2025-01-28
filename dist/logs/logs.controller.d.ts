import { LogsService } from './logs.service';
import { Response } from 'express';
export declare class LogsController {
    private readonly logsService;
    constructor(logsService: LogsService);
    create(body: any, file: Express.Multer.File): Promise<{
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
    delete(ticketNumber: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
    getStackTraceReport(ticketNumber: string, res: Response): Promise<void>;
}
