import { Injectable } from '@nestjs/common';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AlunosService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateAlunoDto) {
    return this.prisma.aluno.create({
      data,
    });
  }

  findAll() {
    return this.prisma.aluno.findMany();
  }

  findOne(id: number) {
    return this.prisma.aluno.findUnique({
      where: { id },
    });
  }

  update(id: number, data: UpdateAlunoDto) {
    return this.prisma.aluno.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.aluno.delete({
      where: { id },
    });
  }
}
