import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Department } from "./entities/department.entity";
import { Repository } from "typeorm";
import { CreateDepartmentDto } from "./dto/create-department.dto";
import { CreateDepartmentsDto } from "./dto/create-departments.dto";

@Injectable()
export class DepartmentService{
    constructor(
        @InjectRepository(Department) private readonly departmentRepository : Repository<Department>,
    ){}

    async creatDepartment(createDepartmentDto : CreateDepartmentDto){
        // process.exit(); // Stop execution
        const department =  this.departmentRepository.create(createDepartmentDto);
        return await this.departmentRepository.save(department);
    }

    async findall(): Promise<Department[]>{
        // console.log("hello"); // Output the data
        // process.exit("hello"); // Stop execution
        return await this.departmentRepository.find({ relations: ['employees'] });
    }

    // .......................... Both are correct......................
    async createMultipleDepartments(createDepartmentsDto: CreateDepartmentsDto): Promise<Department[]>{
        const department = this.departmentRepository.create(createDepartmentsDto.departments);
        return await this.departmentRepository.save(department);

    }

    async createMultiple(createDepartmentsDto: CreateDepartmentsDto) {
        const departments = createDepartmentsDto.departments;
        const createdDepartments = await Promise.all(
          departments.map(department => this.create(department))
        );
        return createdDepartments;
    }
    async create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
        const department = this.departmentRepository.create(createDepartmentDto);
        return await this.departmentRepository.save(department);
    }
    // .................................end............................
    

}