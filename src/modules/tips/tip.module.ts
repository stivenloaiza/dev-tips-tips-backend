import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Tip, TipSchema } from './entities/tip.entity';
import {
  Technology,
  TechnologySchema,
} from 'src/setUp/technology/entities/technology.entity';
import {
  Subtechnology,
  SubtechnologySchema,
} from 'src/setUp/subtechnology/entities/subtechnology.entity';
import { Lang, LangSchema } from 'src/setUp/lang/entities/lang.entity';
import { Level, LevelSchema } from 'src/setUp/level/entities/level.entity';
import { TipsController } from './controller/tip.controller';
import { TipsService } from './service/tips.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tip.name, schema: TipSchema },
      { name: Technology.name, schema: TechnologySchema },
      { name: Subtechnology.name, schema: SubtechnologySchema },
      { name: Lang.name, schema: LangSchema },
      { name: Level.name, schema: LevelSchema },
    ]),
  ],
  controllers: [TipsController],
  providers: [TipsService],
  exports: [TipsService],
})
export class TipsModule {}
