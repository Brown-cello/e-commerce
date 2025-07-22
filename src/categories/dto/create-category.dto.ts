import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
        @IsNotEmpty({message: 'input title'})
        @IsString({message: 'title must be a string'})
        title:string
    
        @IsString({message: 'description must be a string'})
        @IsNotEmpty({message: 'input description'})
        description:string;
    
    
        
}
