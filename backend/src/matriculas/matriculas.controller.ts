import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, NotFoundException, HttpCode } from '@nestjs/common';
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
  async findOne(@Param('id') id: string) {
    const matricula = await this.matriculasService.findOne(+id);

    if (!matricula) {
      throw new NotFoundException('Matrícula não encontrada');
    }

    return matricula;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar uma matrícula por ID' })
  @ApiResponse({ status: 200, description: 'Matrícula atualizada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  @ApiResponse({ status: 404, description: 'Matrícula não encontrada.' })
  async update(@Param('id') id: string, @Body() updateMatriculaDto: UpdateMatriculaDto) {
    const matriculaUpdate = await this.matriculasService.update(+id, updateMatriculaDto);

    if (!matriculaUpdate) {
      throw new NotFoundException('Matrícula não encontrada');
    }

    return matriculaUpdate;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma matrícula por ID' })
  @ApiResponse({ status: 204, description: 'Matrícula removida com sucesso.' })
  @ApiResponse({ status: 404, description: 'Matrícula não encontrada.' })
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    try {
      await this.matriculasService.remove(+id);

    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new NotFoundException('Matrícula não encontrada');  
    }
  }
}
