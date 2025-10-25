import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlunoDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  @ApiProperty({ description: 'Nome completo do aluno', example: 'João da Silva' })
  nome: string;

  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'O email não pode ser vazio' })
  @ApiProperty({ description: 'Endereço de email do aluno', example: 'joao.silva@email.com' })
  email: string;
}
