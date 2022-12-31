import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async runSeed() {
    const logger = new Logger('Bootstrap');

    const admin = this.userRepository.create({
      email: 'admin@gmail.com',
      password: bcrypt.hashSync('A1b2c3', 10),
      roles: ['super-user', 'admin', 'user'],
      fullName: 'Jairo Esteban Martinez Portillo',
    });

    const user = await this.userRepository.findOne({
      where: { email: admin.email },
    });

    if (user) throw new ForbiddenException();

    await this.userRepository.save(admin);

    logger.log('Seed executed');
    return { message: 'Seed executed' };
  }
}
