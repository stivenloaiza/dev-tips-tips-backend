import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersistenceModule } from './libs/persistence/persistence.module';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './libs/persistence/dbConfig';
import { TipsModule } from './modules/tips/tip.module';
import { LevelModule } from './setUp/level/level.module';
import { LangModule } from './setUp/lang/lang.module';
import { TechnologyModule } from './setUp/technology/technology.module';
import { SubtechnologyModule } from './setUp/subtechnology/subTechnology.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [dbConfig],
      isGlobal: true,
    }),
    PersistenceModule,
    TipsModule,
    LevelModule,
    LangModule,
    TechnologyModule,
    SubtechnologyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
