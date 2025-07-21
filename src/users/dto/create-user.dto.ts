import { IsString, IsNotEmpty, IsMongoId, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Foydalanuvchi ID si',
    example: '507f1f77bcf86cd799439011',
  })
  @IsMongoId()
  _id: string;

  @ApiProperty({ description: 'Foydalanuvchi ismi', example: 'Ali Valiev' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Foydalanuvchi emaili',
    example: 'ali@example.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Foydalanuvchi roli',
    example: 'student',
    enum: ['student', 'admin'],
  })
  role: string;
}
