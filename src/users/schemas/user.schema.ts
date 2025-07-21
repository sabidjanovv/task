import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: ['student', 'admin'], default: 'student' })
  role: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Course' }], default: [] })
  registeredCourses: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
