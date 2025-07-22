import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'input title' })
  @IsString({ message: 'title must be a string' })
  title: string;
  @IsNotEmpty({ message: 'input description' })
  @IsString({ message: 'desc must be a string' })
  description: string;
  @IsNotEmpty({ message: 'input price' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'price must be a number & can have up to 2 decimal places' },
  )
  @IsPositive({ message: 'price must be a positive number' })
  price: number;
  @IsNotEmpty({ message: 'input stock' })
  @IsNumber({}, { message: 'stock must be a number' })
  @Min(0, { message: 'stock must be a positive number' })
  stock: number;
  @IsNotEmpty({ message: 'input category' })
  @IsString({ message: 'category must be a string' })
  CategoryId: string;
}
