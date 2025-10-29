import { Injectable } from '@nestjs/common';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { PaginateAlunosDto } from './dto/paginate-alunos.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { LogsService } from 'src/logs/logs.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AlunosService {
  constructor(
    private prisma: PrismaService,
    private logsService: LogsService,
  ) {}

  async create(data: CreateAlunoDto) {
    const aluno = await this.prisma.aluno.create({
      data,
    });

    await this.logsService.create(
      `Aluno criado: ID ${aluno.id}, Nome: ${aluno.nome}`,
      'AlunosService.create',
    );

    return aluno;
  }

  async findAll(params: PaginateAlunosDto) {
    const { search, page = 1, limit = 10, sort = 'createdAt', order = 'asc' } = params;
    const skip = (page - 1) * limit;

    const where: Prisma.AlunoWhereInput = search
      ? {
          OR: [
            { nome: { contains: search, mode: 'insensitive' as Prisma.QueryMode } },
            { email: { contains: search, mode: 'insensitive' as Prisma.QueryMode } },
          ],
        }
      : {};

    const [total, alunos] = await this.prisma.$transaction([
      this.prisma.aluno.count({ where }),
      this.prisma.aluno.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sort]: order },
      }),
    ]);

    return {
      alunos,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  findOne(id: number) {
    return this.prisma.aluno.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: UpdateAlunoDto) {
    const alunoUpdate = await this.prisma.aluno.update({
      where: { id },
      data,
    });

    await this.logsService.create(
      `Aluno atualizado: ID ${alunoUpdate.id}, Nome: ${alunoUpdate.nome}`,
      'AlunosService.update',
    );

    return alunoUpdate;
  }

  async remove(id: number) {
    const aluno = await this.prisma.aluno.delete({
      where: { id },
    });

    await this.logsService.create(
      `Aluno removido: ID ${aluno.id}, Nome: ${aluno.nome}`,
      'AlunosService.remove',
    );

    return aluno; 
  }
}
