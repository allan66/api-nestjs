import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';
import { Function } from '../schemas/user.schema';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  name: string;

  @IsEmail({}, { message: 'E-mail inválido' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Escolha a função, admin ou client' })
  function: Function;
}
