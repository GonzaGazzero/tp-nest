import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductTypeEntity } from './productType.entity';

@Entity('products') //trata a la clase como una entidad
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column() //indica las columnas
  price: number;
  @ManyToOne(() => ProductTypeEntity, (productType) => productType.products)
  productType: ProductTypeEntity;
}
