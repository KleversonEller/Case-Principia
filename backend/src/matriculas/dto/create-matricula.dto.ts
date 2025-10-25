import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMatriculaDto {
  @IsInt()
  @IsNotEmpty({ message: 'O aluno a ser matriculado é obrigatório.' })
  @ApiProperty({ description: 'ID do aluno a ser matriculado', example: 1 })
  alunoId: number;

  @IsInt()
  @IsNotEmpty({ message: 'O curso no qual o aluno será matriculado é obrigatório.' })
  @ApiProperty({ description: 'ID do curso no qual o aluno será matriculado', example: 1 })
  cursoId: number;
}
