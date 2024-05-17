import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity('productTypes') //trata a la clase como una entidad
export class ProductTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @OneToMany(() => ProductEntity, (product) => product.productType)
  products: ProductEntity[];
}
