import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth.credentials.dto";

@Injectable()
export class UserRepository extends Repository<User> {
    async signUp (authCredentials: AuthCredentialsDto): Promise<void> {
        const  {username, password} = authCredentials;
        const user = new User();
        user.username = username;
        user.password = password;
        await user.save();
    }   
}