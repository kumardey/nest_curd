    import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
    import { InjectRepository } from '@nestjs/typeorm';
    import { Connection, Repository } from 'typeorm';
    import { Employee } from './entities/employee.entity';
    import { EmployeeAddress } from './entities/employee-address.entity';
    import { CreateEmployeeDto } from './dto/create-employee.dto';
    import { CreateEmployeeAddressDto } from './dto/create-employee-address.dto';
import { promises } from 'dns';
import { SearchEmployeeDto } from './dto/search-employee.dto';
import { Department } from 'src/department/entities/department.entity';

    @Injectable()
    export class EmployeeService {
        constructor(
            @InjectRepository(Employee)
            private readonly employeeRepository: Repository<Employee>,
            
            @InjectRepository(EmployeeAddress)
            private readonly employeeAddressRepository: Repository<EmployeeAddress>,

            @InjectRepository(Department)
            private readonly departmentRepository: Repository<Department>, // Inject Department repository

            
        
            private readonly connection: Connection
            ) {}
        
        async createEmployeeAndAddress(employeeDto: CreateEmployeeDto, addressDto: CreateEmployeeAddressDto) {
            const queryRunner = this.connection.createQueryRunner();
            await queryRunner.startTransaction();
        
            try {

                const department  = await this.departmentRepository.findOne({
                    where: {id: employeeDto.departmentId},
                });
                console.log("department",department);
                if(!department){
                    throw new NotFoundException(`department with id ${employeeDto.departmentId} not found`)
                }
                // Insert employee
                const employee = this.employeeRepository.create({...employeeDto,department});
                const savedEmployee = await queryRunner.manager.save(Employee, employee);
                console.log("savedEmployee",savedEmployee);
            
                // Insert employee address with the generated employee ID
                const address = this.employeeAddressRepository.create({
                    ...addressDto,
                    employee: savedEmployee,
                });
                await queryRunner.manager.save(EmployeeAddress, address);
            
                await queryRunner.commitTransaction();
                return { success: true };
            } catch (error) {
                await queryRunner.rollbackTransaction();
                throw new BadRequestException('Transaction failed: ' + error.message);
            } finally {
                await queryRunner.release();
            }
        }
        getHello(): string {
            return 'Hello World kumar dey bbb!';
        }

        async getAllEmployeesWithAddresses(): Promise<Employee[]>{
            return await this.employeeRepository.find({ relations: ['addresses','department']});

        }

        async deleteEmployee(id: number): Promise<{ success: boolean }> {
            const employee = await this.employeeRepository.findOne({ where: { id }});
// console.log(id);
            // return id;
            if (!employee) {
                throw new NotFoundException('Employee not found');
            }
          

            await this.employeeRepository.remove(employee);

            return { success: true };
        }

        async deleteEmployeeManual(id: number): Promise<{ success: boolean }> {
            const employee = await this.employeeRepository.findOne({
              where: { id },
              relations: ['addresses'], // Load the related addresses
            });
        
            if (!employee) {
              throw new NotFoundException('Employee not found');
            }
        
            // Delete associated addresses first
            await this.employeeAddressRepository.delete({ employee: { id } });
        
            // Then delete the employee
            await this.employeeRepository.remove(employee);
            return { success: true };
        }

        async findAll(searchEmployeeDto: SearchEmployeeDto): Promise<{ data: Employee[], total: number, page: number, lastPage: number }> {
            const { page, limit, name, email, minAge, maxAge } = searchEmployeeDto;
            const skip = (page - 1) * limit;
        
            const query = this.employeeRepository.createQueryBuilder('employee');
        
            if (name) query.andWhere('employee.name LIKE :name', { name: `%${name}%` });
            if (email) query.andWhere('employee.email = :email', { email });
            if (minAge) query.andWhere('employee.age >= :minAge', { minAge });
            if (maxAge) query.andWhere('employee.age <= :maxAge', { maxAge });
        
            const [data, total] = await query.skip(skip).take(limit).getManyAndCount();
        
            return {
              data,
              total,
              page,
              lastPage: Math.ceil(total / limit),
            };
        }
    }
