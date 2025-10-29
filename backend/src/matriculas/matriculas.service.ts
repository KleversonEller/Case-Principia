import { Injectable } from '@nestjs/common';
import { CreateMatriculaDto } from './dto/create-matricula.dto';
import { UpdateMatriculaDto } from './dto/update-matricula.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { LogsService } from 'src/logs/logs.service';

@Injectable()
export class MatriculasService {
  constructor(
    private prisma: PrismaService,
    private logsService: LogsService,
  ) {}

  async create(data: CreateMatriculaDto) {
    const matricula = await this.prisma.matricula.create({
      data,
    });

    await this.logsService.create(
      `Matrícula criada: ID ${matricula.id}, AlunoID: ${matricula.alunoId}, CursoID: ${matricula.cursoId}`,
      'MatriculasService.create',
    );

    return matricula;
  }

  findAll() {
    return this.prisma.matricula.findMany();
  }

  findOne(id: number) {
    return this.prisma.matricula.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: UpdateMatriculaDto) {
    const matriculaUpdate = await this.prisma.matricula.update({
      where: { id },
      data,
    });

    await this.logsService.create(
      `Matrícula atualizada: ID ${matriculaUpdate.id}, AlunoID: ${matriculaUpdate.alunoId}, CursoID: ${matriculaUpdate.cursoId}`,
      'MatriculasService.update',
    );

    return matriculaUpdate;
  }

  async remove(id: number) {
    const matricula = await this.prisma.matricula.delete({
      where: { id },
    });

    await this.logsService.create(
      `Matrícula removida: ID ${matricula.id}, AlunoID: ${matricula.alunoId}, CursoID: ${matricula.cursoId}`,
      'MatriculasService.remove',
    );

    return matricula;
  }
}
