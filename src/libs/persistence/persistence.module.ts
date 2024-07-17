import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigType } from '@nestjs/config';
import dbConfig from './dbConfig';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof dbConfig>) => {
        const { db } = configService;
        const uriDb = `mongodb+srv://${db.user}:${db.password}@${db.host_remote}/${db.name_remote}?retryWrites=true&w=majority`;
        return { uri: uriDb };
      },
      inject: [dbConfig.KEY],
    }),
  ],
})
export class PersistenceModule {}
