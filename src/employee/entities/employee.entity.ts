import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { EmployeeAddress } from './employee-address.entity';
import { Department } from 'src/department/entities/department.entity';
import { Project } from 'src/project/entities/project.entity';

@Entity()  // Marks this class as a database entity
export class Employee {
  @PrimaryGeneratedColumn()  // Auto-generates unique IDs for each employee
  id: number;

  @Column()  // Regular column for the employee's name
  name: string;

  @Column()
  age: number;

  @Column()
  email: string;

  // One employee can have multiple addresses
  @OneToMany(() => EmployeeAddress, (address) => address.employee)
  addresses: EmployeeAddress[];  // Relation to EmployeeAddress entity

   // Many Employees belong to one Department
   @ManyToOne(()=>Department, (department)=>department.employees)
  //  @JoinColumn({ name: 'department_id' })  // Maps the foreign key to the 'employee_id' column
   department: Department;

   @ManyToMany(()=>Project,(project)=>project.employees)
   @JoinTable()
   projects:Project[];
}