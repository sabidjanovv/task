import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, LoginResponseDto } from './dto/auth.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Yangi foydalanuvchi ro‘yxatdan o‘tkazish' })
  @ApiResponse({
    status: 201,
    description: 'Foydalanuvchi muvaffaqiyatli ro‘yxatdan o‘tdi',
  })
  @ApiResponse({ status: 400, description: 'Email allaqachon mavjud' })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Foydalanuvchi tizimga kirishi va JWT token olishi',
  })
  @ApiResponse({
    status: 200,
    type: LoginResponseDto,
    description: 'Muvaffaqiyatli kirish',
  })
  @ApiResponse({ status: 401, description: 'Noto‘g‘ri email yoki parol' })
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(loginDto);
  }
}
