import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { EmployeeAddress } from './entities/employee-address.entity';
import { Department } from 'src/department/entities/department.entity';
import { Project } from 'src/project/entities/project.entity';
import { EmployeeProjectController } from './employeeProject.controller';
import { EmployeeProjectService } from './employeeProject.service';
@Module({
    imports: [TypeOrmModule.forFeature([Employee,EmployeeAddress,Department,Project])],  // Import TypeOrmModule and register your Employee entity
    controllers: [EmployeeController,EmployeeProjectController],               // Add your controllers here
    providers: [EmployeeService,EmployeeProjectService], 
  })
  export class EmployeeModule {}