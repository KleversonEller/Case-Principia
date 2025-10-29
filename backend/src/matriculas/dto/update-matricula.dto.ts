import { PartialType } from '@nestjs/mapped-types';
import { CreateMatriculaDto } from './create-matricula.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateMatriculaDto extends PartialType(CreateMatriculaDto) {
    @ApiPropertyOptional({ description: 'ID do aluno', example: 2 })
    alunoId?: number;

    @ApiPropertyOptional({ description: 'ID do curso', example: 2 })
    cursoId?: number;

    @ApiPropertyOptional({ description: 'Situação da matrícula', example: 'ativa' })
    situacao?: string;

    @ApiPropertyOptional({ description: 'Status da matrícula', example: 'cursando' })
    status?: string;
}
