import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LevelController } from './controller/level.controller';
import { LevelService } from './service/level.service';
import { Level, LevelSchema } from './entities/level.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Level.name, schema: LevelSchema }]),
  ],
  controllers: [LevelController],
  providers: [LevelService],
  exports: [LevelService],
})
export class LevelModule {}
