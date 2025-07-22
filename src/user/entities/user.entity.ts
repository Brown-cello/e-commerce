import { CategoryEntity } from "src/categories/entities/category.entity";
import { ProductEntity } from "src/product/entities/product.entity";
import { UserRole } from "src/utility/enum/user.role.enum";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    userName:string;

    @Column()
    email:string;

    @Column({select:false})
    password:string;

    @Column({
        type:'enum',
        enum:UserRole,
        default:UserRole.USER
      })
      role:UserRole

      @OneToMany(() => CategoryEntity, (category) => category.addedby)
      categories: CategoryEntity[];

  @OneToMany(()=>ProductEntity,(prod)=>prod.addedby)
  products:ProductEntity[]
    
}
