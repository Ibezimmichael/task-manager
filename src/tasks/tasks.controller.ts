import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksStatusValidationPipe } from './pipes/tasks-status-validation.pipes';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    // @Get()
    // getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
    //     if(Object.keys(filterDto).length) {
    //         return this.tasksService.getTaskWithFilters(filterDto);
    //     } else {
    //         return this.tasksService.getAllTasks();
    //     }
    // }
    // @Get('/:id')
    // getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    //     return this.tasksService.getTaskById(id);
    // }

    // @Post()
    // // @UsePipes(ValidationPipe)
    // createTask(@Body(ValidationPipe) createTaskDto: CreateTaskDto): Task {
    //     return this.tasksService.createTask(createTaskDto)
    // }

    // @Put('/:id')
    // updateTask(@Param('id')  id:string, @Body() updateTaskDto: UpdateTaskDto): Task {
    //     return this.tasksService.updateTask(id, updateTaskDto)
    // }

    // @Patch('/:id/status')
    // updateTaskStatus(
    //     @Param('id')  id:string, 
    //     @Body('status', TasksStatusValidationPipe)status: TaskStatus): Task {
    //     return this.tasksService.updateTaskStatus(id, status)
    // }


    // @Delete('/:id')
    // deleteTaskById(@Param('id') id: string): void {
    //     this.tasksService.deleteTask(id);
    // }

}
