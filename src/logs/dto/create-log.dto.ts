/* eslint-disable prettier/prettier */
import { IsString, IsOptional, IsDateString, IsInt } from 'class-validator';

export class CreateLogDto {
  @IsOptional()
  @IsInt()
  errorCode?: number;

  @IsString()
  errorMessage: string;

  @IsDateString()
  timestamp: string;

  @IsString()
  deviceInfo: string;

  @IsString()
  errorTitle: string;

  @IsString()
  userDescription: string;

  @IsOptional()
  @IsString() // Stores the file path or URL
  stackTraceReport?: string;
}
