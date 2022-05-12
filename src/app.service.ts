import { Injectable } from '@nestjs/common';
import { getCurrentData } from 'yahoo-stock-prices';
import * as ccxt from 'ccxt';

interface Ticker {
  currency: string;
  price: number;
}

@Injectable()
export class AppService {
  async getTicker(ticker: string): Promise<Ticker> {
    const data = await getCurrentData(ticker);
    return data as Ticker;
  }
  async getCriptoTicker(ticker: string): Promise<any> {
    const binance = new ccxt.binance();
    const data = await binance.fetchTicker(ticker);
    return { ticker, price: data['average'] };
  }
}
