import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TipDocument = Tip & Document;

@Schema({ timestamps: true })
export class Tip {
  @Prop()
  multimedia_url: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  body: string;

  @Prop()
  link: string;

  @Prop({ required: true })
  available: boolean;

  @Prop()
  level: string;

  @Prop()
  technology: string;

  @Prop()
  subtechnology: string;

  @Prop()
  lang: string;

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

export const TipSchema = SchemaFactory.createForClass(Tip);
