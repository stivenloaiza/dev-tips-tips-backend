import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types as MongooseTypes } from 'mongoose';
import { Lang } from 'src/setUp/lang/entities/lang.entity';
import { Level } from 'src/setUp/level/entities/level.entity';
import { Subtechnology } from 'src/setUp/subtechnology/entities/subtechnology.entity';
import { Technology } from 'src/setUp/technology/entities/technology.entity';

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

  @Prop({ type: [{ type: MongooseTypes.ObjectId, ref: 'Level' }] })
  level: Level[];

  @Prop({ type: [{ type: MongooseTypes.ObjectId, ref: 'Technology' }] })
  technology: Technology[];

  @Prop({ type: [{ type: MongooseTypes.ObjectId, ref: 'Subtechnology' }] })
  subtechnology: Subtechnology[];

  @Prop({ type: [{ type: MongooseTypes.ObjectId, ref: 'Lang' }] })
  lang: Lang[];

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
