import { IsArray, ValidateNested } from "class-validator";
import { CreateDepartmentDto } from "./create-department.dto";
import { Type } from "class-transformer";


export class CreateDepartmentsDto {
    @IsArray()
    @ValidateNested({each: true})
    @Type(()=>CreateDepartmentDto)
    departments:CreateDepartmentDto[];
}