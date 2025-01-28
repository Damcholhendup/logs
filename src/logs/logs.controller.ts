/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, Param, Delete, UploadedFile, UseInterceptors, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { LogsService } from './logs.service';
import { CreateLogDto } from './dto/create-log.dto';
import { Response } from 'express';
import * as path from 'path';

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('stackTraceReport'))
  async create(
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      console.log('Received body:', body);
      console.log('Uploaded file:', file);

      const dataString = body.data;
      if (dataString) {
        const parsedData = JSON.parse(dataString);

        // Save file to local folder or S3 and get its path/URL
        const filePath = file ? await this.logsService.saveFile(file) : undefined;

        const sanitizedDto = {
          ...parsedData,
          stackTraceReport: filePath, // Save the file path/URL
        };

        console.log('Sanitized DTO:', sanitizedDto);

        return this.logsService.create(sanitizedDto);
      } else {
        throw new Error('No "data" field in the multipart request');
      }
    } catch (error) {
      console.error('Error handling upload:', error.message);
      throw error;
    }
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

  @Get(':ticketNumber/stackTraceReport')
  async getStackTraceReport(@Param('ticketNumber') ticketNumber: string, @Res() res: Response) {
    try {
      const filePath = await this.logsService.getStackTraceReport(ticketNumber);

      // Serve the file
      res.sendFile(filePath, { root: path.resolve('.') });
    } catch (error) {
      res.status(404).send(error.message);
    }
  }
}
