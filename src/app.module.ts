import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import {CoinSchema} from "./app.model";
import { ServeStaticModule} from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
      ServeStaticModule.forRoot({
          rootPath: join(__dirname, '../..', 'client/dist'),
      }),
      // TODO: put password in env
      MongooseModule.forRoot(
        'mongodb+srv://admin:r6JV167jnZIm4qrE@cluster0.bw8xz.mongodb.net/crypto?retryWrites=true&w=majority'
      ),
      MongooseModule.forFeature(
          [{name: 'Coin', schema: CoinSchema}]
      ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
