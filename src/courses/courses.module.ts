import { Module, forwardRef } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from './schemas/course.schemas';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
    forwardRef(() => UsersModule), // ⬅️ forwardRef bilan o'rab qo'yildi
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [MongooseModule],
})
export class CoursesModule {}
