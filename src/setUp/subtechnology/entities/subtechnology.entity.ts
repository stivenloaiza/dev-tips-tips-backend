import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SubtechnologyDocument = Subtechnology & Document;

@Schema({ timestamps: true })
export class Subtechnology {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [Number], ref: 'Technology' })
  technology: number[];

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

export const SubtechnologySchema = SchemaFactory.createForClass(Subtechnology);
