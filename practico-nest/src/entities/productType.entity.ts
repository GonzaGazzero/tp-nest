import { Column, Entity, OneToMany, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity('productTypes') //trata a la clase como una entidad
export class ProductTypeEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @OneToMany(() => ProductEntity, (product) => product.productType)
  products: ProductEntity[];
}
