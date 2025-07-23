import {
  Controller,
  Get,
  Param,
  UseGuards,
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
import { AdminGuard } from '../common/guards/admin.guard';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id/courses')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @ApiOperation({ summary: 'Get all courses a student is registered in' })
  @ApiResponse({
    status: 200,
    description: 'List of registered courses retrieved successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'You are not allowed to view courses for this user',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async getUserCourses(@Param('id') id: string) {
    return this.usersService.getUserCourses(id);
  }
}
