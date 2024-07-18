import { Module } from '@nestjs/common';
import { TipsModule } from './modules/tips/tip.module';
import { LevelModule } from './setUp/level/level.module';
import { LangModule } from './setUp/lang/lang.module';
import { TechnologyModule } from './setUp/technology/technology.module';
import { SubtechnologyModule } from './setUp/subtechnology/subTechnology.module';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './libs/persistence/dbConfig';
import { PersistenceModule } from './libs/persistence/persistence.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [dbConfig],
      isGlobal: true,
    }),
    TipsModule,
    LevelModule,
    LangModule,
    TechnologyModule,
    SubtechnologyModule,
    PersistenceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
