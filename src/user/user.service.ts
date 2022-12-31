import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from '../auth/auth.service';
import * as bcrypt from 'bcrypt';
import { Auth } from '../auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/dto/valid-roles.interface';
import { PaginationDto } from '../common/dto/pagination.dto';
import { NotFoundException } from '@nestjs/common/exceptions';
import { ForbiddenException } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });

      await this.userRepository.save(user);

      delete user.password;

      return { ...user, token: this.authService.getJwtToken({ id: user.id }) };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const [data, total] = await this.userRepository.findAndCount({
      take: limit,
      skip: offset,
      order: {
        createdAt: "ASC",
      },
    });

    return { data, total };
  }

  async findOne(id: string, user: User) {
    const usuario = await this.userRepository.findOneBy({ id });

    if (!usuario)
      throw new NotFoundException(`Usuario con id: ${id} no encontrado`);

    if (user.roles.includes('super-user' && 'admin')) return usuario;

    if (id !== user.id)
      throw new ForbiddenException(
        `${user.fullName} no tiene los permisos necesarios`,
      );

    return usuario;
  }

  async update(id: string, updateUserDto: UpdateUserDto, user: User) {
    await this.findOne(id, user);

    await this.userRepository.update(id, updateUserDto);

    return { message: `Usuario actualizado` };
  }

  async remove(id: string) {
    const { affected } = await this.userRepository.delete({ id });
    if (affected === 0)
      throw new BadRequestException(`Usuario con id ${id} no encontrado`);

    return { message: 'Usuario eliminado' };
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    console.log(error);

    throw new InternalServerErrorException('Intentalo de nuevo mas terde');
  }
}
