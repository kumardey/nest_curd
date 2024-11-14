import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Employee } from "./entities/employee.entity";
import { Repository } from "typeorm";
import { Project } from "src/project/entities/project.entity";

@Injectable()
export class EmployeeProjectService{
    constructor(
        @InjectRepository(Employee)
        private readonly employeeRepository :Repository<Employee>,
        @InjectRepository(Project)
        private readonly projectRepository :Repository<Project>,
    ){}
    async attachEmployeeProject(employeeId: number, projectIds: number[]): Promise<any>{
        const employee = await this.employeeRepository.findOne({ where: {id: employeeId}, relations:['projects']});
        const projects = await this.projectRepository.find({
            where: projectIds.map(id => ({ id })),
        });
        employee.projects =[...employee.projects,...projects];
        await this.employeeRepository.save(employee);
        return {
            status: true,
            message: 'Data inserted successfully.',
        };
        // return {employee,projects,projectIds};
    }
}