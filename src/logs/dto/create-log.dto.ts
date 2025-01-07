/* eslint-disable prettier/prettier */
import { IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateLogDto {
  @IsString()
  errorCode: string;

  @IsString()
  errorMessage: string;

  @IsDateString()
  timestamp: string;

  @IsString()
  deviceInfo: string;

  @IsString()
  errorTitle: string;

  @IsString()
  userDescription: string; // Only one field now
}
