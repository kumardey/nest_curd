import { Body, Controller, Get, Post } from "@nestjs/common";
import { DepartmentService } from "./department.service";
import { CreateDepartmentDto } from "./dto/create-department.dto";
import { promises } from "dns";
import { Department } from "./entities/department.entity";

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

}