import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { TaskStatus } from './tasks-status-enum';
import { User } from 'src/auth/user.entity';
import { createTask, getTasks } from './operations';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>
    ) { }

    async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]>{

        const result = await getTasks(filterDto, this.taskRepository, user)
        return result
        
    }

    async getTaskById(id: number, user: User): Promise<Task> {
        const task = await this.taskRepository.findOne({ where: { id: id, userId: user.id } });

        if (!task) {
            throw new NotFoundException(`Task with ${id} not found`);
        }
        return task;
    }

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const task = await createTask(createTaskDto, user)
        return task;
    }


    async updateTaskStatus(id: number, status: TaskStatus, user: User): Promise<Task> {
        const task = await this.getTaskById(id, user)
        task.status = status;
        await task.save();
        return task
    }


    async updateTask(id: number, updateTaskDto: UpdateTaskDto, user: User): Promise<Task> {
        await this.taskRepository.update(id, updateTaskDto)
        const task = this.getTaskById(id, user);
        return task
    }

    async deleteTask(id: number, user: User): Promise<void> {
        const task = await this.taskRepository.delete({id, userId: user.id});

        if (task.affected === 0) {
            throw new NotFoundException(`Task with ${id} not found`);
        }
    }
}
