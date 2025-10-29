import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMatriculaDto {
  @IsInt({ message: 'O ID do aluno deve ser um número inteiro.' })
  @IsNotEmpty({ message: 'O aluno a ser matriculado é obrigatório.' })
  @ApiProperty({ description: 'ID do aluno a ser matriculado', example: 1 })
  alunoId: number;

  @IsInt({ message: 'O ID do curso deve ser um número inteiro.' })
  @IsNotEmpty({ message: 'O curso no qual o aluno será matriculado é obrigatório.' })
  @ApiProperty({ description: 'ID do curso no qual o aluno será matriculado', example: 1 })
  cursoId: number;

  @IsOptional()
  @IsString({ message: 'A situação da matrícula deve ser uma string.' })
  @ApiPropertyOptional({ description: 'Situação da matrícula', example: 'ativa' })
  situacao?: string;

  @IsOptional()
  @IsString({ message: 'O status da matrícula deve ser uma string.' })
  @ApiPropertyOptional({ description: 'Status da matrícula', example: 'cursando' })
  status?: string;
}
