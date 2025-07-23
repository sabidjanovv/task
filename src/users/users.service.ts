import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './schemas/user.schema';
import { Course } from '../courses/schemas/course.schemas';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Course.name) private courseModel: Model<Course>,
  ) {}

  async getUserCourses(userId: string): Promise<Course[]> {
    if (!Types.ObjectId.isValid(userId)) {
      throw new NotFoundException('Yaroqsiz foydalanuvchi ID');
    }

    const user = await this.userModel
      .findById(userId)
      .populate<{ registeredCourses: Course[] }>('registeredCourses')
      .exec();

    if (!user) {
      throw new NotFoundException('Foydalanuvchi topilmadi');
    }

    if (user.role !== 'student' && user.registeredCourses.length > 0) {
      throw new ForbiddenException(
        'Faqat talabalar kurslarga ro‘yxatdan o‘tishi mumkin',
      );
    }

    return user.registeredCourses;
  }

  async findOne(userId: string): Promise<User> {
    if (!Types.ObjectId.isValid(userId)) {
      throw new NotFoundException('Yaroqsiz foydalanuvchi ID');
    }

    const user = await this.userModel.findById(userId).exec();

    if (!user) {
      throw new NotFoundException('Foydalanuvchi topilmadi');
    }

    return user;
  }
}
