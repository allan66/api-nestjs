import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './schemas/user.schema';
import { FiltersUserDto } from './dto/filters-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: mongoose.Model<User>,
  ) {}

  private readonly fields = 'name function email createdAt _id updatedAt';

  async list(filters: FiltersUserDto): Promise<User[]> {
    const query: any = {};
    if (filters.name) {
      query.name = { $regex: filters.name, $options: 'i' };
    }
    if (filters.email) {
      query.email = { $regex: filters.email, $options: 'i' };
    }
    if (filters.function) {
      query.function = filters.function;
    }
    return await this.userModel.find(query).select(this.fields);
  }

  async create(user: User): Promise<User> {
    return await this.userModel.create(user);
  }

  async get(id: string): Promise<User> {
    const user = await this.userModel.findById(id).select(this.fields);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return user;
  }

  async update(id: string, user: User): Promise<User> {
    return await this.userModel
      .findByIdAndUpdate(id, user, {
        new: true,
        runValidators: true,
      })
      .select(this.fields);
  }

  async delete(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }

  async findByName(name: string): Promise<User> {
    return await this.userModel.findOne({ name });
  }
}
