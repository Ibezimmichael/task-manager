import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { TaskStatus } from './tasks-status-enum';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>
    ) { }


    async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        const query = this.taskRepository.createQueryBuilder('task');
        if (filterDto.status) {
            query.andWhere('task.status = :status', { status: filterDto.status });
        }

        if (filterDto.search) {
            query.andWhere('(task.title LIKE :search OR task.description LIKE :search OR task.status LIKE :search)', { search: `%${filterDto.search}%` });
        }

        return await query.getMany();
    }

    async getTaskById(id: number): Promise<Task> {
        const task = await this.taskRepository.findOne({ where: { id: id } });

        if (!task) {
            throw new NotFoundException(`Task with ${id} not found`);
        }
        return task;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const task = await this.taskRepository.save(createTaskDto)
        return task
    }


    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id)
        task.status = status;
        await task.save();
        return task
    }


    async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
        await this.taskRepository.update(id, updateTaskDto)
        const task = this.getTaskById(id);
        return task
    }

    async deleteTask(id: number): Promise<void> {
        const task = await this.taskRepository.delete(id);
        console.log(task);

        if (task.affected === 0) {
            throw new NotFoundException(`Task with ${id} not found`);
        }
    }
}
