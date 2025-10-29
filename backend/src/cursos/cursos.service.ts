import { Injectable } from '@nestjs/common';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { PaginateCursosDto } from './dto/paginate-cursos.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { LogsService } from 'src/logs/logs.service';
import { Prisma } from '@prisma/client';

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

  async findAll(params: PaginateCursosDto) {
    const { search, page = 1, limit = 10, sort = 'createdAt', order = 'asc' } = params;
    const skip = (page - 1) * limit;

    const where: Prisma.CursoWhereInput = search
      ? {
          OR: [
            { nome: { contains: search, mode: 'insensitive' as Prisma.QueryMode } },
            { descricao: { contains: search, mode: 'insensitive' as Prisma.QueryMode } },
          ],
        }
      : {};

    const [total, cursos] = await this.prisma.$transaction([
      this.prisma.curso.count({ where }),
      this.prisma.curso.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sort]: order },
      }),
    ]);

    return {
      cursos,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
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
