import { Injectable } from '@nestjs/common';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { LogsService } from 'src/logs/logs.service';

@Injectable()
export class CursosService {
  constructor(
    private prisma: PrismaService,
    private logsService: LogsService,
  ) {}

  async create(data: CreateCursoDto) {
    const curso = await this.prisma.curso.create({
      data,
    });

    await this.logsService.create(
      `Curso criado: ID ${curso.id}, Nome: ${curso.nome}`,
      'CursosService.create',
    );

    return curso;
  }

  findAll() {
    return this.prisma.curso.findMany();
  }

  findOne(id: number) {
    return this.prisma.curso.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: UpdateCursoDto) {
    const cursoUpdate = await this.prisma.curso.update({
      where: { id },
      data,
    });

    await this.logsService.create(
      `Curso atualizado: ID ${cursoUpdate.id}, Nome: ${cursoUpdate.nome}`,
      'CursosService.update',
    );

    return cursoUpdate;
  }

  async remove(id: number) {
    const curso = await this.prisma.curso.delete({
      where: { id },
    });

    await this.logsService.create(
      `Curso removido: ID ${curso.id}, Nome: ${curso.nome}`,
      'CursosService.remove',
    );

    return curso;
  }
}
