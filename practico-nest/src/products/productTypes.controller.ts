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
} from '@nestjs/common';
import { ProductTypesService } from './productTypes.service';
import { DeepPartial } from 'typeorm';
import { ProductTypeEntity } from 'src/entities/productType.entity'; 

@Controller('product-types')
export class ProductTypesController {
  constructor(private service: ProductTypesService) {}

  @Post()
  async createProductType(
    @Body() productType: DeepPartial<ProductTypeEntity>,
  ): Promise<ProductTypeEntity> {
    return await this.service.createProductType(productType);
  }

  @Get()
  async findAll() {
    return await this.service.findAll();
  }

  @Put('update/:id')
  async updateProductType(
    @Param('id') id: number,
    @Body() productType: DeepPartial<ProductTypeEntity>,
  ): Promise<ProductTypeEntity> {
    const updatedProductType = await this.service.updateProductType(id, productType);
    return updatedProductType;
  }
  
  @Get(':id')
  async findByID(@Param('id') id: number): Promise<ProductTypeEntity> {
    return await this.service.findByID(id);
  }
}

