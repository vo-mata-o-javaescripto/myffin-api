import { Injectable } from '@nestjs/common';
import { getCurrentData } from 'yahoo-stock-prices';

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
}
