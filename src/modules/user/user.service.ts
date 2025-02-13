import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { Function, User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { FiltersUserDto } from './dto/filters-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async list(filters: FiltersUserDto): Promise<User[]> {
    return await this.userRepository.list(filters);
  }

  async create(user: CreateUserDto): Promise<User> {
    const userByEmail = await this.getByEmail(user.email);

    if (userByEmail) {
      throw new BadRequestException('E-mail já cadastrado');
    }

    const userByName = await this.getByName(user.name);

    if (userByName) {
      throw new BadRequestException('Nome de usuário já cadastrado');
    }

    if (user.function !== Function.CLIENT && user.function !== Function.ADMIN) {
      throw new BadRequestException('Função inválida');
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    return await this.userRepository.create(user as User);
  }

  async get(id: string): Promise<User> {
    return await this.userRepository.get(id);
  }

  async update(id: string, user: UpdateUserDto): Promise<User> {
    const userByEmail = await this.getByEmail(user.email);

    if (userByEmail) {
      if (userByEmail.email === user.email && userByEmail.id !== id) {
        throw new BadRequestException('E-mail já cadastrado');
      }
    }

    const userByName = await this.getByName(user.name);

    if (userByName) {
      if (userByName.name === user.name && userByName.id !== id) {
        throw new BadRequestException('Nome de usuário já cadastrado');
      }
    }

    if (user.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }

    if (user.function !== Function.CLIENT && user.function !== Function.ADMIN) {
      throw new BadRequestException(
        'Função inválida, escolha "admin" ou "client"',
      );
    }

    return await this.userRepository.update(id, user as User);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async getByEmail(email: string): Promise<User> {
    return await this.userRepository.findByEmail(email);
  }

  async getByName(name: string): Promise<User> {
    return await this.userRepository.findByName(name);
  }
}
