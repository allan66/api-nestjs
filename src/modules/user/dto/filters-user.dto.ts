import { Function } from '../schemas/user.schema';
import { IsOptional, IsString, IsEmail } from 'class-validator';

export class FiltersUserDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @IsOptional()
  @IsString()
  readonly function?: Function;
}
