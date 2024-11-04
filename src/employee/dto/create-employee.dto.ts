import { IsNotEmpty, IsEmail, IsInt, Min, Max ,IsPositive, IsString } from 'class-validator';

export class CreateEmployeeDto {
    @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsInt()
  @Min(18)
  @Max(65)
  age: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  departmentId:number;
}
