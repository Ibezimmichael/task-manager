import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';
import { log } from 'console';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.entity';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ){}

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentials: AuthCredentialsDto): Promise<void> {
        return this.authService.signUp(authCredentials)
    } 

    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentials: AuthCredentialsDto): Promise<{accessToken: string} | string> {
        return this.authService.validateUserPassword(authCredentials);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user:User) {
        console.log(user)
    }
    
}
