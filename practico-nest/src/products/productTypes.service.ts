import { HttpException, Injectable } from '@nestjs/common';
import { ProductTypeEntity } from 'src/entities/productType.entity';
import { DeepPartial } from 'typeorm';

@Injectable()
export class ProductTypesService {
  repository = ProductTypeEntity;

  async createProductType(productType: DeepPartial<ProductTypeEntity>): Promise<ProductTypeEntity> {
    try {
      return await this.repository.save(productType);
    } catch (error) {
      throw new HttpException('Create product type error', 500);
    }
  }

  async findAll() {
    try {
      return await this.repository.find({
        relations: {
          products: true,
        },
      });
    } catch (error) {
      throw new HttpException('Find product types error', 500);
    }
  }

  async updateProductType(
    productTypeId: number,
    productType: DeepPartial<ProductTypeEntity>,
  ): Promise<ProductTypeEntity> {
    try {
      const existingProductType = await this.repository.findOne({where:{id:productTypeId}});
      if (!existingProductType) {
        throw new HttpException('Product type not found', 404);
      }
      Object.assign(existingProductType, productType);

      const updatedProductType = await this.repository.save(existingProductType);
      return updatedProductType;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error; 
      }
      throw new HttpException('Update product type error', 500);
    }
  }

  async findByID(productTypeId: number): Promise<ProductTypeEntity> {
    try {
      const productType = await this.repository.findOne({
        where: {
          id: productTypeId,
        },
        relations: {
          products: true,
        },
      });
      
      if (!productType) {
        throw new HttpException('Product type not found', 404);
      }
      
      return productType;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error; 
      }
      throw new HttpException('Find product type by id error', 500);
    }
  }
  
}