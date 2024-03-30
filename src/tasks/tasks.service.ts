import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)    
        private task: Repository<Task> ,
    ){}

    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }

    // getTaskWithFilters(filterDto: GetTasksFilterDto): Task[]{
    //     const {status, search} = filterDto;
    //     let tasks = this.getAllTasks();
    //     if(status) {
    //         tasks = tasks.filter(task => task.status === status)
    //     }
    //     if(search) {
    //         tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search));

    //     }
    //     return tasks;
    // }

    // async getTaskById(id: number): Promise<Task> {
    //     const task = await this.taskRepository.findOne({where: {id: id} });

    //     if(!task){
    //         throw new NotFoundException(`Task with ${id} not found`);
    //     }
    //     return task;
    // }

    // getTaskById(id: string): Task {
    //     const task = this.tasks.find(task => task.id === id);
    //     if(!task){
    //         throw new NotFoundException(`Task with ${id} not found`);
    //     }
    //     return task;
    // }

    // createTask(createTaskDto: CreateTaskDto): Task {
    //     const {title, description} = createTaskDto;

    //     const task: Task = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN
    //     }
    //     this.tasks.push(task);
    //     return task;
    // }

    // updateTaskStatus(id: string, status: TaskStatus): Task {
    //     const task = this.getTaskById(id)
    //     task.status = status;
    //     return task
    // } 

    // updateTask(id: string, updateTaskDto: UpdateTaskDto): Task {
    //     const { title, description, status } = updateTaskDto;
    //     const task = this.getTaskById(id)
    //     task.title = title;
    //     task.description = description;
    //     task.status = status;
    //     return task
    // }

    // deleteTask(id: string): void {
    //     const taskFound = this.getTaskById(id);
    //     this.tasks = this.tasks.filter(task =>task.id !== taskFound.id);
    // }
}
