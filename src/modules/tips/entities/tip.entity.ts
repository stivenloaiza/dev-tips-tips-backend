import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types as MongooseTypes } from 'mongoose';
import { Lang } from 'src/setup/lang/entity/lang.entity';
import { Level } from 'src/setup/range/entity/levels.entity';
import { Subtechnology } from 'src/setup/subtechnology/entity/subTecnology.entity';
import { Tecnology } from 'src/setup/technology/entity/tecnology.entity';

export type TipDocument = Tip & Document;

@Schema({ timestamps: true })
export class Tip {
  @Prop({ required: true, unique: true })
  id: number;

  @Prop()
  img_url: string;

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

  @Prop({ type: [{ type: MongooseTypes.ObjectId, ref: 'Tecnology' }] })
  technology: Tecnology[];

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
