import {Controller, Get, Param} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
      private readonly coinsService: AppService,
  ) {}

  @Get(':date')
  async getCoins(@Param('date') date:string) {
    return await this.coinsService.getCoins(date);
  }
}
