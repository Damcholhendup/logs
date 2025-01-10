"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const uuid_1 = require("uuid");
let LogsService = class LogsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createLogDto) {
        const { errorCode, errorMessage, timestamp, deviceInfo, errorTitle, userDescription } = createLogDto;
        const datePrefix = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const uniqueSuffix = (0, uuid_1.v4)().substring(0, 6).toUpperCase();
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
            },
        });
        return {
            ticketNumber,
        };
    }
    async findAll() {
        return this.prisma.log.findMany();
    }
    async findByTicketNumber(ticketNumber) {
        return this.prisma.log.findMany({
            where: { ticketNumber },
        });
    }
    async deleteByTicketNumber(ticketNumber) {
        return this.prisma.log.deleteMany({
            where: { ticketNumber },
        });
    }
};
exports.LogsService = LogsService;
exports.LogsService = LogsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LogsService);
//# sourceMappingURL=logs.service.js.map