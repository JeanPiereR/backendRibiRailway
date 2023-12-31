import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { PaginationDto } from 'src/common/dtos/pagination.dto';


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,
  ){}





  async create(createUserDto: CreateUserDto) {
    
    try {

      const { password, ...userData } = createUserDto;

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync( password, 10 )
      });

      await this.userRepository.save ( user )
      delete user.password;

      return {
        ...user,
        token: this.getJwtToken({ id: user.id })
      };

    } catch (error) {

      this.handleDBErrors( error );

    }

  }






  async login (loginUserDto: LoginUserDto) {

    const { password, email } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: {email},
      select: { email:true, id: true, fullName: true, isActive:true, roles:true, password:true}
      });

    if ( !user )
      throw new UnauthorizedException("Credenciales no validas");
    
    if ( !bcrypt.compareSync( password, user.password ) )
      throw new UnauthorizedException("Credenciales no validas");

    return {
      ...user,
      token: this.getJwtToken({ id: user.id })
    };
    

  }


  async checkAuthStatus ( user: User ) {

    return {
      ...user,
      token: this.getJwtToken({ id: user.id })
    }
  }



  private getJwtToken ( payload: JwtPayload ) {

    const token = this.jwtService.sign( payload );
    return token;

  }



  async findAll ( paginationDto:PaginationDto ) { //TODO PART 1 DE PRUEBA

    const { limit=10, offset=0 } = paginationDto;

    return this.userRepository.find({
      take: limit,
      skip: offset,
    })
  }


  private handleDBErrors ( error: any ): never {
    if ( error.code ==="23505" )
      throw new BadRequestException ( error.detail );

    console.log(error)

    throw new InternalServerErrorException("Favor revisar los errorees");
  }

  
}
