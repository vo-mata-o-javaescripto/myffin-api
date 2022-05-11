import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':ticker')
  async getTicker(@Param() params: { ticker: string }, @Res() res: Response) {
    const ticker = params.ticker;

    try {
      const data = await this.appService.getTicker(ticker);
      return res.status(HttpStatus.OK).json(data);
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({ msg: err.message });
    }
  }
}
