import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Employee } from "./entities/employee.entity";
import { Repository } from "typeorm";
import { Project } from "src/project/entities/project.entity";
import { DataSource } from 'typeorm';

@Injectable()
export class EmployeeProjectService{
    constructor(
        @InjectRepository(Employee)
        private readonly employeeRepository :Repository<Employee>,
        @InjectRepository(Project)
        private readonly projectRepository :Repository<Project>,
        private readonly dataSource: DataSource,
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

    // async detachEmployeeProject(employeeId: number, projectIds:number[]): Promise<any>{
    //     const employee = await this.employeeRepository.findOne({where: {id: employeeId},relations:['projects']});
    //     employee.projects =employee.projects.filter(Project=>! projectIds.includes(Project.id)); // Remove roles by ID
    //     await this.employeeRepository.save(employee);
    //     return {
    //         status: true,
    //         message: 'Data inserted successfully.',
    //     };

    // }
    async detachEmployeeProject(employeeId: number, projectIds:number[]): Promise<any>{
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try{
            // const employee = await queryRunner.manager.findOne('Employee', {
            //     where: { id: employeeId },
            //     relations: ['projects'],
            // });
            const employee = await this.employeeRepository.findOne({where: {id: employeeId},relations:['projects']});

            if(!employee){
                throw new NotFoundException(`Employee id ${employeeId} not found`)
            }
            const projects = await queryRunner.manager.find('Project', {
                where: projectIds.map(id => ({ id })),
            });
            // await this.employeeRepository.remove(employee);
            // await queryRunner.manager.remove('Project', projects);

            if (projects.length !== projectIds.length) {
                throw new NotFoundException('Some projects not found');
            }
            // employee.projects =employee.projects.filter(Project=>! projectIds.includes(Project.id)); // Remove roles by ID
            // Detach projects
            employee.projects = employee.projects.filter(
                project => !projectIds.includes(project.id),
            );
             // Save updated employee
             await queryRunner.manager.save('Employee', employee);

              // Commit transaction
            await queryRunner.commitTransaction();
            return {
                status: true,
                message: 'Data inserted successfully.',
            };
        }catch (error) {
            // Rollback transaction in case of error
            await queryRunner.rollbackTransaction();

            return {
                status: false,
                message: error.message || 'An error occurred while detaching projects.',
            };
        } finally {
            // Release the query runner
            await queryRunner.release();
        }
        
        
        
       

    }
}