import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString } from 'class-validator';

export class StudentIdDto {
  @ApiProperty({ example: '12345ij2345nnnda' })
  @IsString()
  studentId: string;
}
