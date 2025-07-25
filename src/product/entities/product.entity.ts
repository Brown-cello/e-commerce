import { CategoryEntity } from 'src/categories/entities/category.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  title: string;
    @Column()
  description:string
    @Column({type: 'decimal', precision: 10, scale: 2, default: 0})
    price: number;
  @Column()
  stock: number;
    
    @ManyToOne(() => User, (user) => user.products, )
    addedby: User;

    @ManyToOne(() => CategoryEntity, (cat) => cat.products, )
    category:CategoryEntity

    
    @OneToMany(()=> Review,(review)=>review.product)
    reviews:Review[];

}
