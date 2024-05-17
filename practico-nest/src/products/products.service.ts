import { HttpException, Injectable } from '@nestjs/common';
import { ProductEntity } from 'src/entities/product.entity';
import { DeepPartial } from 'typeorm';

@Injectable()
export class ProductsService {
  repository = ProductEntity;
  
  async create(product: DeepPartial<ProductEntity>): Promise<ProductEntity> {
    try {
      return await this.repository.save(product);
    } catch (error) {
      throw new HttpException('Create product error', 500);
    }
  }

  async findAll() {
    try {
      return await this.repository.find({
        relations: {
          productType: true,
        },
      });
    } catch (error) {
      throw new HttpException('Find products error', 500);
    }
  }

  async updateProduct(
    productId: number,
    product: DeepPartial<ProductEntity>,
  ): Promise<ProductEntity> {
    try {
      const existingProduct = await this.repository.findOne({where:{id:productId}});
      if (!existingProduct) {
        throw new HttpException('Product not found', 404);
      }
      Object.assign(existingProduct, product);

      const updatedProduct = await this.repository.save(existingProduct);
      return updatedProduct;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error; 
      }
      throw new HttpException('Update product error', 500);
    }
  }

  async findByID(productId: number): Promise<ProductEntity> {
    try {
      const product = await this.repository.findOne({
        where: {
          id: productId,
        },
        relations: {
          productType: true,
        },
      });
      
      if (!product) {
        throw new HttpException('Product not found', 404);
      }
      
      return product;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error; 
      }
      throw new HttpException('Find product by id error', 500);
    }
  }
  
}
