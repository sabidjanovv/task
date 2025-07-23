import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '../schemas/task.schema';

export class CreateTaskDto {
  @ApiProperty({ example: 'Learn NestJS', description: 'Task title' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Read the official docs and follow a tutorial',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: '2025-07-25T15:30:00Z', required: false })
  @IsOptional()
  @IsDateString()
  dueDate?: Date;

  @ApiProperty({
    enum: TaskStatus,
    default: TaskStatus.PENDING,
    required: false,
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
