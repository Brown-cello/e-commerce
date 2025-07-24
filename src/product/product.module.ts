import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { ProductsController } from './product.controller';
import { ProductsService } from './product.service';

@Module({imports: [TypeOrmModule.forFeature([ProductEntity]),AuthModule,UserModule,CategoriesModule],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports:[ProductsService]
})
export class ProductModule {}
