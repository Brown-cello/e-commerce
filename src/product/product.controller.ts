import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../utility/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';
import { ProductsService } from './product.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @UseGuards(AuthGuard())
  @Post()
  async create(@Body() createProductDto: CreateProductDto,@CurrentUser() currentUser:User) {
    return this.productsService.create(createProductDto,currentUser);
  }

  @UseGuards(AuthGuard())
  @Get()
  async findAll() {
    return  this.productsService.findAll();
  }

  @UseGuards(AuthGuard())
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @UseGuards(AuthGuard())
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @CurrentUser() currentUser:User) {
    return this.productsService.update(id, updateProductDto,currentUser);
  }

  @UseGuards(AuthGuard())
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}