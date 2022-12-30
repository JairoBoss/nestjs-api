import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { User } from './entities/auth.entity';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [ TypeOrmModule.forFeature([User]),
 
  //Indicamos que el metodo de seguridad que vamos a utilizar son los jwt
  PassportModule.register({ defaultStrategy: 'jwt' }), 

  JwtModule.registerAsync({
    useFactory: () => {
      console.log(process.env.JWT_SECRET);
      return {
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '365d' },
      };
    },
  }),

  
]
})
export class AuthModule {}
