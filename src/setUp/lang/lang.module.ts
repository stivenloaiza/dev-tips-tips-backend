import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LangController } from './controller/lang.controller';
import { LangService } from './service/lang.service';
import { Lang, LangSchema } from './entities/lang.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Lang.name, schema: LangSchema }]),
  ],
  controllers: [LangController],
  providers: [LangService],
  exports: [LangService],
})
export class LangModule {}
