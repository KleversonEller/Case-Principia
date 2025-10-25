import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateMatriculaDto {
  @IsNotEmpty({ message: 'O aluno a ser matriculado é obrigatório.' })
  @IsInt()
  alunoId: number;

  @IsNotEmpty({ message: 'O curso no qual o aluno será matriculado é obrigatório.' })
  @IsInt()
  cursoId: number;
}
