import { Body, Controller, Get, Post } from "@nestjs/common";
import { DepartmentService } from "./department.service";
import { CreateDepartmentDto } from "./dto/create-department.dto";
import { promises } from "dns";
import { Department } from "./entities/department.entity";
import { CreateDepartmentsDto } from "./dto/create-departments.dto";

@Controller('departments')
export class DepartmentController{
    constructor(private readonly departmentService: DepartmentService){}

    @Post()
    async creatDepartment(@Body() createDepartmentDto: CreateDepartmentDto){
        return this.departmentService.creatDepartment(createDepartmentDto);
    }
    @Get('all')
    async findAllDepartment(): Promise<Department[]>{
        return this.departmentService.findall();
    }

    @Post('bulk1')
    async createMultiple1(@Body() createDepartmentsDto: CreateDepartmentsDto) {
      return this.departmentService.createMultipleDepartments(createDepartmentsDto);
    }
    @Post('bulk2')
    async createMultiple2(@Body() createDepartmentsDto: CreateDepartmentsDto) {
      return this.departmentService.createMultiple(createDepartmentsDto);
    }
}