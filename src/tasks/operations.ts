import { User } from "src/auth/user.entity"
import { CreateTaskDto } from "./dto/create-task.dto"
import { Task } from "./task.entity"
import { TaskStatus } from "./tasks-status-enum"
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto"
import { Logger } from "@nestjs/common"


export async function createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto
    const task = new Task()
    task.description = description
    task.title = title
    task.status = TaskStatus.OPEN
    task.user = user
    await task.save()
    delete task.user
    return task;
}


export async function getTasks(filterDto: GetTasksFilterDto, taskRepository, user: User): Promise<Task[]> {
    let logger = new Logger('GetTasks')
    
    const { status, search } = filterDto
    const query = taskRepository.createQueryBuilder('task')
    
    query.where('task.userId = :userId', {userId: user.id})

    if(status) {
        query.andWhere('task.status = :status', { status })
    }

    if(search) {
        query.andWhere('(task.title LIKE :search OR task.description LIKE :search  OR task.status LIKE :search)', { search: `%${search}%` })
    }
    
    const tasks = await query.getMany()
    return tasks
}