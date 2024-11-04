import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Department } from "./entities/department.entity";
import { Repository } from "typeorm";
import { CreateDepartmentDto } from "./dto/create-department.dto";

@Injectable()
export class DepartmentService{
    constructor(
        @InjectRepository(Department) private readonly departmentRepository : Repository<Department>,
    ){}

    async creatDepartment(createDepartmentDto : CreateDepartmentDto){
        const department =  this.departmentRepository.create(createDepartmentDto);
        return await this.departmentRepository.save(department);
    }

    async findall(): Promise<Department[]>{
        return await this.departmentRepository.find({ relations: ['employees'] });
    }

}