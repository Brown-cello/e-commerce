import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>
){}
  async create(createCategoryDto: CreateCategoryDto, currentUser:User){
    const { title, description } = createCategoryDto;
    const categorytitle = await this.categoryRepository.findOne({ where: { title:title } });
    if (categorytitle) {
      throw new NotFoundException(`Category with title ${title} already exists`);
    }
    const category = await this.categoryRepository.create(createCategoryDto);
    category.addedby = currentUser;
    return await this.categoryRepository.save(category);
  }


  findAll() : Promise<CategoryEntity[]> {
    return this.categoryRepository.find()
  }

   async findOne (id: string) :Promise<CategoryEntity | null> {
    if (!id) {
      throw new Error('ID is required');
    }
 return await this.categoryRepository.findOne({
  where: { id: id },
  relations: { addedby: true },
  select: {
    addedby: {
      id: true,
      userName: true,
      email: true,
  }
}});
  }

 
  async update(id:string, updatedata: Partial<User>) {
    const updatecategory = await this.categoryRepository.findOne({ where: { id } });

    if (!updatecategory) {
      throw new NotFoundException(`Library record with ID ${id} not found`);
    }

    const newupdatecategory= await this.categoryRepository.update(id,updatecategory);
    const updated = await this.categoryRepository.findOne({ where: { id } })
    

    return{
      statuscode:200,
      message:'link succesfully updated',
      data:updated
    }
}
  async remove(id: string) {
    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    await this.categoryRepository.delete(id);
    return {
      statuscode: 200,
      message: 'Category successfully deleted',
      data: category,
    };
  }
}
