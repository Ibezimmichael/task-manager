import {BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../tasks-status-enum";

export class TasksStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE
    ];
    transform(value: any) {
        value = value.toUpperCase();        
        if(!this.isStatusValid(value)){
            throw new BadRequestException(`"${value}" is not a valid status`)
        }
        return value;
    }

    private isStatusValid(status: any){
        const index = this.allowedStatuses.indexOf(status);
        return index !== -1;
    }
}