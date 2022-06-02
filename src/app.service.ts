import { Injectable } from '@nestjs/common';
import { getCurrentData } from 'yahoo-stock-prices';
import * as ccxt from 'ccxt';
import axios, { AxiosResponse } from 'axios';

interface Ticker {
  currency: string;
  price: number;
}

@Injectable()
export class AppService {
  // constructor(private httpService: HttpService) {}

  async getTicker(ticker: string): Promise<Ticker> {
    const data = await getCurrentData(ticker);
    return data as Ticker;
  }

  async getCriptoTicker(ticker: string): Promise<Ticker> {
    const binance = new ccxt.binance();
    const data = await binance.fetchTicker(ticker);
    return { currency: ticker, price: data['average'] };
  }

  directusLogout(token: string): Promise<AxiosResponse<any>> {
    return axios.post('http://localhost:8055/auth/logout', {
      refresh_token: 'sdfsdfsdf',
    });
  }
}
