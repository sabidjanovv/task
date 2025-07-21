import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ description: 'Foydalanuvchi ismi', example: 'Ali Valiev' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Foydalanuvchi emaili',
    example: 'ali@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Foydalanuvchi paroli', example: 'Password123!' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'Foydalanuvchi roli',
    example: 'student',
    enum: ['student', 'admin'],
  })
  @IsString()
  @IsNotEmpty()
  role: string;
}

export class LoginDto {
  @ApiProperty({
    description: 'Foydalanuvchi emaili',
    example: 'ali@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Foydalanuvchi paroli', example: 'Password123!' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class LoginResponseDto {
  @ApiProperty({
    description: 'JWT token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;
}
