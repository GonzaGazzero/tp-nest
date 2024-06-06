import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  HttpException,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { DeepPartial } from 'typeorm';
import { ProductEntity } from 'src/entities/product.entity';
import { AuthGuard } from 'src/middlewares/auth.middleware';

@Controller('products')
export class ProductsController {
  constructor(private service: ProductsService) {}

  @Post()
  async create(
    @Body() product: DeepPartial<ProductEntity>,
  ): Promise<ProductEntity> {
    return await this.service.create(product);
  }

  @UseGuards(new AuthGuard('list-products'))
  @Get()
  async findAll() {
    return await this.service.findAll();
  }

  @Put('update/:id')
  async updateProduct(
    @Param('id') id: number,
    @Body() product: DeepPartial<ProductEntity>,
  ): Promise<ProductEntity> {
    const updatedProduct = await this.service.updateProduct(id, product);
    return updatedProduct;
  }
  
  @Get(':id')
  async findByID(@Param('id') id: number): Promise<ProductEntity> {
    return await this.service.findByID(id);
  }
}

