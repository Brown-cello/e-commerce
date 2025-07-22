import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { CategoryEntity } from './entities/category.entity';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { Roles } from 'src/utility/decorators/role';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
@UseGuards(AuthGuard(),RolesGuard)
@Roles('admin','user')
  @Post('category')
  create(@Body() createCategoryDto: CreateCategoryDto,@CurrentUser() currentUser:User){
    return this.categoriesService.create(createCategoryDto,currentUser );
  }

  @Get()
  async findAll() {
    return await this.categoriesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }
  @UseGuards(AuthGuard(),RolesGuard)
  @Roles('admin')
  @Patch(':id')
  async update(@Param('id',) id: string, @Body() updateData: Partial<User>) {
    return  await this.categoriesService.update(id, updateData);
  }


  @UseGuards(AuthGuard(),RolesGuard)
  @Roles('admin')
  @Delete(':id' )
  async delete(@Param('id') id:string) {
    return this.categoriesService.remove(id);
  }
}
