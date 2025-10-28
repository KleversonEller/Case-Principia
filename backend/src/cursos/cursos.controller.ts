import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, NotFoundException, BadRequestException } from '@nestjs/common';
import { CursosService } from './cursos.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Cursos')

@Controller('cursos')
export class CursosController {
  constructor(private readonly cursosService: CursosService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo curso' })
  @ApiResponse({ status: 201, description: 'Curso criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createCursoDto: CreateCursoDto) {
    return this.cursosService.create(createCursoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os cursos' })
  @ApiResponse({ status: 200, description: 'Lista de cursos retornada com sucesso.' })
  findAll() {
    return this.cursosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter detalhes de um curso por ID' })
  @ApiResponse({ status: 200, description: 'Detalhes do curso retornados com sucesso.' })
  @ApiResponse({ status: 404, description: 'Curso não encontrado.' })
  async findOne(@Param('id') id: string) {
    const curso = await this.cursosService.findOne(+id);

    if (!curso) {
      throw new NotFoundException('Curso não encontrado');
    }

    return curso;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um curso por ID' })
  @ApiResponse({ status: 200, description: 'Curso atualizado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  @ApiResponse({ status: 404, description: 'Curso não encontrado.' })
  async update(@Param('id') id: string, @Body() updateCursoDto: UpdateCursoDto) {
    const cursoUpdate = await this.cursosService.update(+id, updateCursoDto);

    if (!cursoUpdate) {
      throw new NotFoundException('Curso não encontrado');
    }

    return cursoUpdate;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um curso por ID' })
  @ApiResponse({ status: 204, description: 'Curso removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Curso não encontrado.' })
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    try {
      await this.cursosService.remove(+id);

    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new NotFoundException('Curso não encontrado');
    }
  }
}
