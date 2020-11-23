import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {AppModule} from "./app.module";
import {getModelToken} from "@nestjs/mongoose";

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    function mockModel() {
    }

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
          AppService,
          {
            provide: getModelToken('Coin'),
            useValue: mockModel,
          },
      ],
      imports: [AppModule],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('calling historic data function', () => {
    it('should return expected data', () => {
      const currentDate = '2019-02-01';
      const map = {
        "tezos": {
          "2019-02-01": {
            "close": "1",
            "volume": "1",
            "marketcap": "1"
          },
          "2019-01-31": {
            "close": "0.5",
            "volume": "1",
            "marketcap": "1"
          },
          "2019-01-25": {
            "close": "0.25",
            "volume": "1",
            "marketcap": "1"
          },
          "2019-01-01": {
            "close": "0.1",
            "volume": "1",
            "marketcap": "1"
          },
        }
      }

      const expectedData = [{
        currency: 'tezos',
        percent_change_24h: '100.00%',
        percent_change_7d: '300.00%',
        percent_change_1m: '900.00%',
        volume: 1,
        market_cap: 1
      }]
      expect(appService.getHistoricData(currentDate, map)).toEqual(expectedData);
    });
  });

  describe('calling historic data with missing data', () => {
    it('should return expected data', () => {
      const currentDate = '2019-02-01';
      const map = {
        "tezos": {
          "2019-02-01": {
            "close": "1",
            "volume": "1",
            "marketcap": "1"
          },
        }
      }

      const expectedData = [{
        currency: 'tezos',
        percent_change_24h: 'NA',
        percent_change_7d: 'NA',
        percent_change_1m: 'NA',
        volume: 1,
        market_cap: 1
      }]
      expect(appService.getHistoricData(currentDate, map)).toEqual(expectedData);
    });
  });

  describe('calling api with empty date', () => {
    it('should return empty array', () => {
      expect(appService.getCoins('')).toMatchObject({});
    });
  });
});
