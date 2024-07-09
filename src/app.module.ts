import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersistenceModule } from './libs/persistence/persistence.module';
import { ConfigModule } from '@nestjs/config';
import { TipsModule } from './modules/tips/tips.module';
import dbConfig from './libs/persistence/dbConfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [dbConfig],
      isGlobal: true,
    }),
    PersistenceModule,
    TipsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

