import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { EmployeeAddress } from './entities/employee-address.entity';
import { Department } from 'src/department/entities/department.entity';
@Module({
    imports: [TypeOrmModule.forFeature([Employee,EmployeeAddress,Department])],  // Import TypeOrmModule and register your Employee entity
    controllers: [EmployeeController],               // Add your controllers here
    providers: [EmployeeService], 
  })
  export class EmployeeModule {}