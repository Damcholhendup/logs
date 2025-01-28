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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const logs_service_1 = require("./logs.service");
const path = require("path");
let LogsController = class LogsController {
    constructor(logsService) {
        this.logsService = logsService;
    }
    async create(body, file) {
        try {
            console.log('Received body:', body);
            console.log('Uploaded file:', file);
            const dataString = body.data;
            if (dataString) {
                const parsedData = JSON.parse(dataString);
                const filePath = file ? await this.logsService.saveFile(file) : undefined;
                const sanitizedDto = {
                    ...parsedData,
                    stackTraceReport: filePath,
                };
                console.log('Sanitized DTO:', sanitizedDto);
                return this.logsService.create(sanitizedDto);
            }
            else {
                throw new Error('No "data" field in the multipart request');
            }
        }
        catch (error) {
            console.error('Error handling upload:', error.message);
            throw error;
        }
    }
    async findAll() {
        return this.logsService.findAll();
    }
    async findByTicketNumber(ticketNumber) {
        return this.logsService.findByTicketNumber(ticketNumber);
    }
    async delete(ticketNumber) {
        return this.logsService.deleteByTicketNumber(ticketNumber);
    }
    async getStackTraceReport(ticketNumber, res) {
        try {
            const filePath = await this.logsService.getStackTraceReport(ticketNumber);
            res.sendFile(filePath, { root: path.resolve('.') });
        }
        catch (error) {
            res.status(404).send(error.message);
        }
    }
};
exports.LogsController = LogsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('stackTraceReport')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LogsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LogsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':ticketNumber'),
    __param(0, (0, common_1.Param)('ticketNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LogsController.prototype, "findByTicketNumber", null);
__decorate([
    (0, common_1.Delete)(':ticketNumber'),
    __param(0, (0, common_1.Param)('ticketNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LogsController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)(':ticketNumber/stackTraceReport'),
    __param(0, (0, common_1.Param)('ticketNumber')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LogsController.prototype, "getStackTraceReport", null);
exports.LogsController = LogsController = __decorate([
    (0, common_1.Controller)('logs'),
    __metadata("design:paramtypes", [logs_service_1.LogsService])
], LogsController);
//# sourceMappingURL=logs.controller.js.map