import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LevelDocument = Level & Document;

@Schema({ timestamps: true })
export class Level {
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

export const LevelSchema = SchemaFactory.createForClass(Level);
