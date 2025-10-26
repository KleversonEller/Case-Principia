import { Injectable } from '@nestjs/common';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { LogsService } from 'src/logs/logs.service';

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

  findAll() {
    return this.prisma.aluno.findMany();
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
