import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { relative } from 'path';
import { title } from 'process';
import { threadId } from 'worker_threads';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    private readonly categoryService: CategoriesService
  ) { }
  async create(createProductDto: CreateProductDto, currentUser: User) {
    const category = await this.categoryService.findOne(createProductDto.CategoryId)
    if (!category) {
      throw new Error('Category not found');
    }
    const product = await this.productRepository.create(createProductDto)
    
    product.category = category
    product.addedby = currentUser

    return await this.productRepository.save(product)
  }

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(id: string) {
    return await this.productRepository.findOne({where:{id:id},
    relations:{
      addedby:true,
      category:true
    },
  select:{
    addedby:{
      id:true,
      userName:true,
      email:true
    },
    category:{
      id:true,
      title:true,
      description:true
    }
  }})
  }

  async update(id: string, updateProductDto:UpdateProductDto) {
    const newUpdate = await this.productRepository.findOne({ where: { id } })
    if (!newUpdate) {
      throw new NotFoundException('Product not found')
    }
    if (!updateProductDto || Object.keys(updateProductDto).length === 0) {
        throw new Error('No update values provided');
    }
    const updateProduct= await this.productRepository.update(id, updateProductDto)

    const updatedProduct = await this.productRepository.findOne({ where: { id } })
    return {
      statusCode: 200,
      message: 'category updated successfully',
      data: updatedProduct
    }
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}