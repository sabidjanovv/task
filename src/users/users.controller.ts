import {
  Controller,
  Get,
  Param,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id/courses')
  @ApiBearerAuth()
  @ApiOperation({ summary: "Talabaning ro'yxatdan o'tgan kurslarini olish" })
  @ApiResponse({
    status: 200,
    description: 'Kurslar ro‘yxati muvaffaqiyatli olindi',
  })
  @ApiResponse({
    status: 403,
    description: 'Faqat o‘z kurslaringizni ko‘rishingiz mumkin',
  })
  @ApiResponse({ status: 404, description: 'Foydalanuvchi topilmadi' })
  async getUserCourses(@Param('id') id: string) {
    return this.usersService.getUserCourses(id);
  }
}
