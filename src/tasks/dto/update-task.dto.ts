import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { TaskStatus } from "../tasks-status-enum";
import { UsePipes } from "@nestjs/common";
import { TasksStatusValidationPipe } from "../pipes/tasks-status-validation.pipes";

export class UpdateTaskDto {
    @IsOptional()
    title: string;
  
    @IsOptional()
    description: string;
  
    @IsOptional()
    @IsEnum(TaskStatus) 
    status: TaskStatus;
}