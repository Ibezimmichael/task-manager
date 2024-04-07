import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksStatusValidationPipe } from './pipes/tasks-status-validation.pipes';
import { Task } from './task.entity';
import { TaskStatus } from './tasks-status-enum';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    private logger = new Logger('TasksController')
    constructor(private tasksService: TasksService) {}

    @Get()
    getTasks(
        @GetUser()user: User,
        @Query(ValidationPipe) filterDto: GetTasksFilterDto
        ): Promise<Task[]> {
        this.logger.verbose(`User ${user.username} retrieving all tasks. filters${JSON.stringify(filterDto)}`)
        return this.tasksService.getTasks(filterDto, user);
    }
    @Get('/:id')
    getTaskById(
        @GetUser()user: User,
        @Param('id', ParseIntPipe) id: number
        ): Promise<Task> {
        return this.tasksService.getTaskById(id, user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(
        @GetUser() user: User,
        @Body(ValidationPipe) createTaskDto: CreateTaskDto
        ): Promise<Task> {
        return this.tasksService.createTask(createTaskDto, user)
    }

    @Put('/:id')
    updateTask(
        @GetUser() user: User,
        @Param('id', ParseIntPipe) id: number,
        @Body() updateTaskDto: UpdateTaskDto): Promise<Task> {
        return this.tasksService.updateTask(id, updateTaskDto, user)
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @GetUser() user: User,
        @Param('id', ParseIntPipe)  id:number, 
        @Body('status', TasksStatusValidationPipe)status: TaskStatus): Promise<Task> {
        return this.tasksService.updateTaskStatus(id, status, user)
    }


    @Delete('/:id')
    deleteTaskById(
        @GetUser() user: User,
        @Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.tasksService.deleteTask(id, user);
    }

}
