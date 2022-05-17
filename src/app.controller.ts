import { Controller, Get, HttpStatus, Param, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('ticker')
  async getTicker(@Query('ticker') ticker: string, @Res() res: Response) {
    try {
      const promises = await Promise.allSettled([
        this.appService.getTicker(ticker),
        this.appService.getCriptoTicker(ticker),
      ]);

      const haveSucess = promises.find((item) => item.status === 'fulfilled');

      if (haveSucess === undefined) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ msg: `Ticker not found: ${ticker}` });
      }

      promises.forEach((item) => {
        if (item.status === 'fulfilled') {
          return res.status(HttpStatus.OK).json(item.value);
        }
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({ msg: err.message });
    }
  }
}
