import { Employee } from "src/employee/entities/employee.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Project{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title: string;

    @ManyToMany(() => Employee ,(employee)=>employee.projects)
    employees:Employee[];
}