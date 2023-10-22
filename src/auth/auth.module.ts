import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    ConfigModule,

    TypeOrmModule.forFeature([ User ]),
    
    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.registerAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: ( ConfigService: ConfigService ) => {

        return{
        secret: ConfigService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: '5 days'
      }
        }
      }
    })

  ],
  
  exports: [TypeOrmModule, JwtStrategy, PassportModule, JwtModule], ///Se hace para que pueda ser usado fuera del modelo

})

export class AuthModule {}
