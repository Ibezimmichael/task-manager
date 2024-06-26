import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./tasks-status-enum";
import { User } from "src/auth/user.entity";

@Entity()
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ default: TaskStatus.OPEN })
    status: TaskStatus;

    @ManyToOne(type => User, user => user.tasks, {eager: false})
    user: User;

    @Column()
    userId: number;

}
