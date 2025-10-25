import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MatriculasService } from './matriculas.service';
import { CreateMatriculaDto } from './dto/create-matricula.dto';
import { UpdateMatriculaDto } from './dto/update-matricula.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Matriculas')

@Controller('matriculas')
export class MatriculasController {
  constructor(private readonly matriculasService: MatriculasService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova matrícula' })
  @ApiResponse({ status: 201, description: 'Matrícula criada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createMatriculaDto: CreateMatriculaDto) {
    return this.matriculasService.create(createMatriculaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as matrículas' })
  @ApiResponse({ status: 200, description: 'Lista de matrículas retornada com sucesso.' })
  findAll() {
    return this.matriculasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter detalhes de uma matrícula por ID' })
  @ApiResponse({ status: 200, description: 'Detalhes da matrícula retornados com sucesso.' })
  @ApiResponse({ status: 404, description: 'Matrícula não encontrada.' })
  findOne(@Param('id') id: string) {
    return this.matriculasService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar uma matrícula por ID' })
  @ApiResponse({ status: 200, description: 'Matrícula atualizada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  @ApiResponse({ status: 404, description: 'Matrícula não encontrada.' })
  update(@Param('id') id: string, @Body() updateMatriculaDto: UpdateMatriculaDto) {
    return this.matriculasService.update(+id, updateMatriculaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma matrícula por ID' })
  @ApiResponse({ status: 200, description: 'Matrícula removida com sucesso.' })
  @ApiResponse({ status: 404, description: 'Matrícula não encontrada.' })
  remove(@Param('id') id: string) {
    return this.matriculasService.remove(+id);
  }
}
