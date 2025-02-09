import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TechnologyDocument = Technology & Document;

@Schema({ timestamps: true })
export class Technology {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [Number], ref: 'Subtechnology' })
  subtechnology: number[];

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

export const TechnologySchema = SchemaFactory.createForClass(Technology);
