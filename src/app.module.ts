import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { TipsModule } from './modules/tips/tip.module';
import { LevelModule } from './setUp/level/level.module';
import { LangModule } from './setUp/lang/lang.module';
import { TechnologyModule } from './setUp/technology/technology.module';
import { SubtechnologyModule } from './setUp/subtechnology/subTechnology.module';

@Module({
  imports: [
    //   ConfigModule.forRoot({
    //     envFilePath: '.env',
    //     load: [dbConfig],
    //     isGlobal: true,
    //   }),
    //   PersistenceModule,
    MongooseModule.forRoot(
      'mongodb+srv://julianroman1990:Samuel0429@cluster0.s9x4jqf.mongodb.net/',
    ),
    TipsModule,
    LevelModule,
    LangModule,
    TechnologyModule,
    SubtechnologyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
