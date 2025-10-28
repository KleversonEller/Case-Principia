import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, NotFoundException, HttpCode } from '@nestjs/common';
import { AlunosService } from './alunos.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Alunos')

@Controller('alunos')
export class AlunosController {
  constructor(private readonly alunosService: AlunosService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo aluno' })
  @ApiResponse({ status: 201, description: 'Aluno criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() CreateAlunoDto: CreateAlunoDto) {
    return this.alunosService.create(CreateAlunoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os alunos' })
  @ApiResponse({ status: 200, description: 'Lista de alunos retornada com sucesso.' })
  findAll() {
    return this.alunosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter detalhes de um aluno por ID' })
  @ApiResponse({ status: 200, description: 'Detalhes do aluno retornados com sucesso.' })
  @ApiResponse({ status: 404, description: 'Aluno não encontrado.' })
  async findOne(@Param('id') id: string) {
    const aluno = await this.alunosService.findOne(+id);

    if (!aluno) {
      throw new NotFoundException('Aluno não encontrado');
    }

    return aluno;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um aluno por ID' })
  @ApiResponse({ status: 200, description: 'Aluno atualizado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  @ApiResponse({ status: 404, description: 'Aluno não encontrado.' })
  async update(@Param('id') id: string, @Body() UpdateAlunoDto: UpdateAlunoDto) {
    const alunoUpdate = await this.alunosService.update(+id, UpdateAlunoDto);

    if (!alunoUpdate) {
      throw new NotFoundException('Aluno não encontrado');
    }

    return alunoUpdate;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um aluno por ID' })
  @ApiResponse({ status: 204, description: 'Aluno removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Aluno não encontrado.' })
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    try {
      await this.alunosService.remove(+id);

    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new NotFoundException('Aluno não encontrado');
    }
  }
}
