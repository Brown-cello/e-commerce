import { ProductEntity } from "src/product/entities/product.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity({ name: "categories" })
export class CategoryEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    title: string;
    @Column()
    description: string;
    
    @ManyToOne(() => User, (user) => user.categories, )
    addedby: User;

     @OneToMany(()=>ProductEntity,(prod)=>prod.category)
      products:ProductEntity[]
}

