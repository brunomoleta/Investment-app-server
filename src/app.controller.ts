import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

// interface IProduct {
//   productList: string[];
//   getProducts(): string[]
//   addProduct(product: string): void;
//   removeProduct(index: number): void
// }
