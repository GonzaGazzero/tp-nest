import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductTypesService } from './productTypes.service';
import { ProductTypesController } from './productTypes.controller';

@Module({
  controllers: [ProductsController, ProductTypesController ],
  providers: [ProductsService, ProductTypesService],
})
export class ProductsModule {}
