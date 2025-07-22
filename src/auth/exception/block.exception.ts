import { ForbiddenException } from "@nestjs/common";

export class blockedException extends ForbiddenException{
    constructor(isBlocked:boolean){
        super(`Forbidden, blocked status ${isBlocked}`)
    }
}