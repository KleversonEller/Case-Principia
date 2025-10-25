import { PartialType } from '@nestjs/mapped-types';
import { CreateAlunoDto } from './create-aluno.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateAlunoDto extends PartialType(CreateAlunoDto) {
    @ApiPropertyOptional({ description: 'Nome completo do aluno', example: 'João da Silva' })
    nome?: string;

    @ApiPropertyOptional({ description: 'Endereço de email do aluno', example: 'joao.silva@email.com' })
    email?: string;
}
