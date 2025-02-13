import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Function, User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FiltersUserDto } from './dto/filters-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async list(
    @Query('name') name?: string,
    @Query('email') email?: string,
    @Query('function') func?: Function,
  ): Promise<User[]> {
    const filter: FiltersUserDto = { name, email, function: func };
    return this.userService.list(filter);
  }

  @Post()
  async create(
    @Body()
    createUserDto: CreateUserDto,
  ): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  async get(
    @Param('id')
    id: string,
  ): Promise<User> {
    return this.userService.get(id);
  }

  @Put(':id')
  async update(
    @Param('id')
    id: string,
    @Body()
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async delete(
    @Param('id')
    id: string,
  ): Promise<void> {
    return this.userService.delete(id);
  }
}
