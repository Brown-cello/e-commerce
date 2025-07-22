import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { ProductsController } from './product.controller';

@Module({imports: [TypeOrmModule.forFeature([ProductEntity]),AuthModule,UserModule,CategoriesModule],
  controllers: [ProductsController],
  providers: [ProductService],
})
export class ProductModule {}
