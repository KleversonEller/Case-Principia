import { PartialType } from '@nestjs/mapped-types';
import { CreateCursoDto } from './create-curso.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCursoDto extends PartialType(CreateCursoDto) {
    @ApiPropertyOptional({ description: 'Nome do curso', example: 'Introdução à Programação' })
    nome?: string;

    @ApiPropertyOptional({ description: 'Descrição do curso', example: 'Curso básico sobre os fundamentos da programação.' })
    descricao?: string;
}
