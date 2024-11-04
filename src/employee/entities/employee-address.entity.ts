import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Employee } from './employee.entity';

@Entity()
export class EmployeeAddress {
  @PrimaryGeneratedColumn()  // Auto-generates unique IDs for each address
  id: number;

  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  postalCode: string;

  @Column()
  country: string;

  @Column({ nullable: true })
  apartment?: string;

  // Explicitly define the employee_id foreign key column
  @ManyToOne(() => Employee, (employee) => employee.addresses
  // right code.............
  // ,{
  //   onDelete: 'CASCADE', // Enable cascade delete
  // }
  )

  @JoinColumn({ name: 'employee_id' })  // Maps the foreign key to the 'employee_id' column
  employee: Employee;
}
