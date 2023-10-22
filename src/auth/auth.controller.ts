import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';
import { GetUser } from './decorators/get-user.decorator';
import { RawHeaders } from './decorators/war-headers.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';
import { ValidRoles } from './interfaces/valid-roles';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}



  @Post("register")
  createUser(@Body() CreateUserDto: CreateUserDto) {
    return this.authService.create(CreateUserDto);
  }




  @Post("login")
  loginUser(@Body() LoginUserDto: LoginUserDto) {
    return this.authService.login(LoginUserDto);
  }


  @Get("check-status")
  @Auth()
  checkAuthStatus(
    @GetUser() user: User
  ){
    return this.authService.checkAuthStatus( user );
  }




  @Get("private")
  @UseGuards( AuthGuard() )
  testingProvateRoute(
    @Req() request: Express.Request,
    @GetUser() user: User,
    @GetUser("email") userEmail: string,
    @RawHeaders() rawHeaders: string[],
  ){

    return{
      ok: true,
      message: "holiwi",
      user,
      userEmail,
      rawHeaders,
    }

  }



  @Get('private2')
  ///El Auth nos permite validar los roles, si el () se deja en blanco todo usuario
  ///autentificado podra ingresar
  @Auth( ValidRoles.admin, ValidRoles.user) //TODO NOS PERMITE ASIGNAR LOS ROLES
  privateRoute2(
    @GetUser() user: User
  ) {

    return {
      ok: true,
      user
    }
  }

  
}
