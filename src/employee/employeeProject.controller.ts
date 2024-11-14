import { Body, Controller, Param, ParseIntPipe, Post } from "@nestjs/common";
import { EmployeeProjectService } from "./employeeProject.service";

@Controller('emppro')
export class EmployeeProjectController{
    constructor(private readonly employeeProjectService :EmployeeProjectService){}
    @Post(':id/attach-project')
    async attachEmployeeProject(@Param('id', ParseIntPipe) employeeId: number, @Body() body: { projectIds: number[] }) {
        // Extract `projectIds` from `body`
        const { projectIds } = body;
        
        // Pass `projectIds` to the service method
        return await this.employeeProjectService.attachEmployeeProject(employeeId, projectIds);
    }
}