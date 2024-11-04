import { IsNotEmpty, IsString, IsPostalCode, Length, IsOptional } from 'class-validator';

export class CreateEmployeeAddressDto {
  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsPostalCode('IN')  // Assuming Indian postal codes
  postalCode: string;

  @IsString()
  @Length(2, 50)
  country: string;

  @IsString()
  @IsOptional()  // Optional, so apartment can be left empty
  apartment?: string;
}