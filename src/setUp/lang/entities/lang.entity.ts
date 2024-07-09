import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Lang extends Document {
  @Prop({ required: true, unique: true })
  id: number;

  @Prop({ required: true })
  name: string;

  @Prop({ default: null })
  createdAt: Date | null;

  @Prop()
  createBy: string;

  @Prop({ default: null })
  updatedAt: Date | null;

  @Prop()
  updateBy: string;

  @Prop({ default: null })
  deletedAt: Date | null;

  @Prop()
  deleteBy: string;
}

export const LangSchema = SchemaFactory.createForClass(Lang);