// src/employees/dto/search-employee.dto.ts
import { PaginationDto } from './pagination.dto';
import { IsOptional, IsString, IsInt, Min, Max } from 'class-validator';

export class SearchEmployeeDto extends PaginationDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsInt()
  @Min(18)
  minAge?: number;

  @IsOptional()
  @IsInt()
  @Max(65)
  maxAge?: number;
}
