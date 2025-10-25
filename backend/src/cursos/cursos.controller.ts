import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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
  findOne(@Param('id') id: string) {
    return this.cursosService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um curso por ID' })
  @ApiResponse({ status: 200, description: 'Curso atualizado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  @ApiResponse({ status: 404, description: 'Curso não encontrado.' })
  update(@Param('id') id: string, @Body() updateCursoDto: UpdateCursoDto) {
    return this.cursosService.update(+id, updateCursoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um curso por ID' })
  @ApiResponse({ status: 200, description: 'Curso removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Curso não encontrado.' })
  remove(@Param('id') id: string) {
    return this.cursosService.remove(+id);
  }
}
