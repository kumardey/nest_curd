import { Controller, Post, Body, Param, Get, UsePipes, Delete, Query } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { CreateEmployeeAddressDto } from './dto/create-employee-address.dto';
// import { get } from 'http';
import { ValidationPipe } from './pipes/validation.pipe';
import { Employee } from './entities/employee.entity';
import { SearchEmployeeDto } from './dto/search-employee.dto';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  // @Get()
  // getHello(): string {
  //   console.log("GET /employees called");
  //   return this.employeeService.getHello();
  // }

  @Get('all')
  async getAllEmployees(): Promise<Employee[]>{
    return await this.employeeService.getAllEmployeesWithAddresses();

  }

  @Get()
  async findAll(@Query() searchEmployeeDto: SearchEmployeeDto) {
    return this.employeeService.findAll(searchEmployeeDto);
  }

//   @Post()
//   create(@Body() createEmployeeDto: CreateEmployeeDto) {
//     return this.employeeService.createEmployee(createEmployeeDto);
//   }

//   @Post(':employeeId/address')
//   addAddress(
//     @Param('employeeId') employeeId: number,
//     @Body() createEmployeeAddressDto: CreateEmployeeAddressDto,
//   ) {
//     return this.employeeService.addAddress(employeeId, createEmployeeAddressDto);
//   }

// @Post()
//   @UsePipes(new ValidationPipe())
//   async createEmployee(
//     @Body() employeeDto: CreateEmployeeDto,
//     @Body() addressDto: CreateEmployeeAddressDto,
//   ) {
//     return await this.employeeService.createEmployeeAndAddress(employeeDto, addressDto);
//   }
// @Post()
// @UsePipes(new ValidationPipe())
// async createEmployee(
// //   @Body('employee') employeeDto: CreateEmployeeDto,
// //   @Body('address') addressDto: CreateEmployeeAddressDto
//   @Body('employee') employeeDto: CreateEmployeeDto,
//   @Body('address') addressDto: CreateEmployeeAddressDto,
// ) {
// //   return await this.employeeService.createEmployeeAndAddress(employeeDto, addressDto);
// return await this.employeeService.createEmployeeAndAddress(employeeDto, addressDto);
// }

  @Post()
  // @UsePipes(new ValidationPipe()) // Apply validation to both parts
  // use global pipes in main.ts file
  async createEmployee(
    @Body('employee') employeeDto: CreateEmployeeDto,
    @Body('address') addressDto: CreateEmployeeAddressDto,
  ) {
    return await this.employeeService.createEmployeeAndAddress(employeeDto, addressDto);
  }
  // .............open onDelete: 'CASCADE', // Enable cascade delete in EmployeeAddress.dto then run this code    
  // @Delete(':id')
  // async deleteEmployee(@Param('id') id: number): Promise<{ success: boolean }> {
  //   return await this.employeeService.deleteEmployee(id);
  // }

  @Delete(':id')
  async deleteEmployeeManual(@Param('id') id: number): Promise<{ success: boolean }> {
    return await this.employeeService.deleteEmployeeManual(id);
  }

}

// @Post()
// @UsePipes(new ValidationPipe())
// async createEmployee(
//     @Body() body: { employee: CreateEmployeeDto; address: CreateEmployeeAddressDto }
// ) {
//     const { employee, address } = body;
//     return await this.employeeService.createEmployeeAndAddress(employee, address);
// }