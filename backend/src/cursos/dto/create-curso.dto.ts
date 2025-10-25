import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCursoDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  nome: string;

  @IsString()
  @IsNotEmpty({ message: 'O curso deve conter uma descrição' })
  descricao: string;
}
