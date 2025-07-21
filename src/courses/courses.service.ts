import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateCourseDto } from './dto/create-course.dto';
import { Course } from './schemas/course.schemas';
import { User } from '../users/schemas/user.schema';
import { StudentIdDto } from './dto/studentId-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<Course>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const course = new this.courseModel(createCourseDto);
    return course.save();
  }

  async findAll(): Promise<Course[]> {
    return this.courseModel.find().exec();
  }

  async registerForCourse(
    courseId: string,
    studentIdDto: StudentIdDto,
  ): Promise<void> {
    const { studentId } = studentIdDto;
    const objectId = new Types.ObjectId(courseId);

    const course = await this.courseModel.findById(objectId).exec();
    if (!course) {
      throw new NotFoundException('Kurs topilmadi');
    }

    const student = await this.userModel.findById(studentId).exec();
    if (!student) {
      throw new NotFoundException('Talaba topilmadi');
    }

    if (student.registeredCourses.some((id) => id.equals(objectId))) {
      throw new BadRequestException(
        'Talaba allaqachon bu kursga ro‘yxatdan o‘tgan',
      );
    }

    student.registeredCourses.push(objectId);
    await student.save();
  }
}
