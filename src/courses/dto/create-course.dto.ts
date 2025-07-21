import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({ example: 'NestJS Bootcamp' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'A complete course on NestJS' })
  @IsString()
  description: string;

  @ApiProperty({ example: '2025-08-01' })
  @IsDateString()
  startDate: string;

  @ApiProperty({ example: '2025-09-01' })
  @IsDateString()
  endDate: string;
}
