// src/courses/courses.controller.ts
import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { StudentIdDto } from './dto/studentId-course.dto';

@ApiTags('courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new course (admin only)' })
  @ApiResponse({ status: 201, description: 'Course created successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden: Admin access required' })
  async createCourse(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all available courses' })
  @ApiResponse({
    status: 200,
    description: 'List of courses retrieved successfully',
  })
  async getAllCourses() {
    return this.coursesService.findAll();
  }

  @Post(':courseId/register')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Register a student for a course' })
  @ApiResponse({
    status: 200,
    description: 'Student registered for course successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Student already registered for this course',
  })
  async registerForCourse(@Param('courseId') courseId: string, @Body() studentIdDto: StudentIdDto) {
    return this.coursesService.registerForCourse(courseId, studentIdDto);
  }
}
