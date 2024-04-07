import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService
    ) { }

    async signUp(authCredentials: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentials;


        const user = new User();
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);

        console.log(user.password);

        try {
            await user.save();
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('username already exists')
            } else {
                throw new InternalServerErrorException();
            }

        }
    }

    async validateUserPassword(authCredentials: AuthCredentialsDto): Promise<{accessToken: string} | string> {
        const { username, password } = authCredentials;
        const user = await this.userRepository.findOne({ where: { username: username } })
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isValid = await user.validatePassword(password);

        if (!isValid) {
            throw new UnauthorizedException('Invalid credentials')
        }

        const payload:JwtPayload = { username }
        const accessToken = await this.jwtService.sign(payload)
        return {accessToken}
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt)
    }
}