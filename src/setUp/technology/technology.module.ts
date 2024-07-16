import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TechnologyController } from './controller/technology.controller';
import { TechnologyService } from './service/technology.service';
import { Technology, TechnologySchema } from './entities/technology.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Technology.name, schema: TechnologySchema },
    ]),
  ],
  controllers: [TechnologyController],
  providers: [TechnologyService],
  exports: [TechnologyService],
})
export class TechnologyModule {}
