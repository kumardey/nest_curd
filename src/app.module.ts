import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { EmployeeModule } from './employee/employee.module'; // Import your Employee module
// import { EmployeeModule } from './employee/employee.module';
import { EmployeeModule } from './employee/employee.module';
import { DepartmentModule } from './department/department.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',               // Database type (can be postgres, sqlite, etc.)
      host: 'localhost',           // Hostname of your database
      port: 3306,                  // Port (for MySQL it's 3306)
      username: 'root',            // Database username
      password: '',        // Database password
      database: 'nest_curd',    // Name of the database
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Path to your entities
      // autoLoadEntities: true, // Auto-load entities, or manually add entities
      // synchronize: true,      // Set to false in production
      synchronize: true,           // Automatically synchronize your database schema (not recommended for production)
    }),
    EmployeeModule // Add your EmployeeModule here
    ,DepartmentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
