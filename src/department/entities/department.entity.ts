import { Employee } from "src/employee/entities/employee.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Department{
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    name: string;

     // One Department can have many Employees
     @OneToMany(()=> Employee, (employee)=> employee.department)
     employees: Employee[];
}