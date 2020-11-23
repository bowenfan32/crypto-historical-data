import {Injectable, Get, HttpException, HttpStatus} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Coin } from './app.model'
import * as moment from 'moment';

@Injectable()
export class AppService {
  private coins: Coin[] = [];
  private coinData = {};

  constructor(@InjectModel('Coin') private readonly coinsModel: typeof Model) {}

  @Get()
  async getCoins(date: string): Promise<object> {
    if (date === '') {
      return {};
    }
    // get coins data from Mongo
    const coins: object = await this.coinsModel.find().exec();

    let dateData = {};
    let currency = '';
    // pre-process the data
    for (let coin of Object.values(coins)) {
      if (coin.currency !== currency) {
        if (currency !== '') {
          this.coinData[currency] = dateData;
        }
        currency = coin.currency;
        dateData = {};
      }

      let timestamp: string = moment(coin.date).format('YYYY-MM-DD');
      dateData[timestamp] = {'close': coin.close, 'volume': coin.volume, 'marketcap': coin.marketcap};
    }
    return this.getHistoricData(date, this.coinData);
  }

  getHistoricData(date, map): object {
    let apiData = [];
    // get percentage calculations based on a historical date and return as API response
    for (const [key, value] of Object.entries(map)) {
      let oneDayBefore: string = moment(date).subtract(1, 'day').format('YYYY-MM-DD');
      let sevenDayBefore: string = moment(date).subtract(7, 'day').format('YYYY-MM-DD');
      let oneMonthBefore: string = moment(date).subtract(1, 'month').format('YYYY-MM-DD');

      let currentDayClose: number =
          value[date] !== undefined ? parseFloat(value[date].close.replace(/,/g, '')) : 0;
      let oneDayBeforeClose: number =
          value[oneDayBefore] !== undefined ? parseFloat(value[oneDayBefore].close.replace(/,/g, '')) : 0;
      let sevenDayBeforeClose: number =
          value[sevenDayBefore] !== undefined ? parseFloat(value[sevenDayBefore].close.replace(/,/g, '')) : 0;
      let oneMonthBeforeClose: number =
          value[oneMonthBefore] !== undefined ? parseFloat(value[oneMonthBefore].close.replace(/,/g, '')) : 0;

      let percentChange24h: string = (currentDayClose == 0 || oneDayBeforeClose == 0) ?
          'NA' : ((currentDayClose - oneDayBeforeClose) / oneDayBeforeClose * 100).toFixed(2) + '%';
      let percentChange7d: string = (currentDayClose == 0 || sevenDayBeforeClose == 0) ?
          'NA' :((currentDayClose - sevenDayBeforeClose) / sevenDayBeforeClose * 100).toFixed(2) + '%';
      let percentChange1m: string = (currentDayClose == 0 || oneMonthBeforeClose == 0) ?
          'NA' : ((currentDayClose - oneMonthBeforeClose) / oneMonthBeforeClose * 100).toFixed(2) + '%';

      apiData.push({
        'currency': key,
        'percent_change_24h': percentChange24h,
        'percent_change_7d': percentChange7d,
        'percent_change_1m': percentChange1m,
        'volume': value[date] !== undefined ? parseFloat(value[date].volume.replace(/,/g, '')) : 'NA',
        'market_cap': value[date] !== undefined ? parseFloat(value[date].marketcap.replace(/,/g, '')) : 'NA' ,
      })
    }
    return apiData;
  }
}
