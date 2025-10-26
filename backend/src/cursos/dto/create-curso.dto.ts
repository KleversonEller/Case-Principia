import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCursoDto {
  @IsString({ message: 'O nome do curso deve ser uma string' })
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  @ApiProperty({ description: 'Nome do curso', example: 'Introdução à Programação' })
  nome: string;

  @IsString({ message: 'A descrição do curso deve ser uma string' })
  @IsNotEmpty({ message: 'O curso deve conter uma descrição' })
  @ApiProperty({ description: 'Descrição do curso', example: 'Curso básico sobre os fundamentos da programação.' })
  descricao: string;
}
