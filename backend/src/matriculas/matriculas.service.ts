import { Injectable } from '@nestjs/common';
import { CreateMatriculaDto } from './dto/create-matricula.dto';
import { UpdateMatriculaDto } from './dto/update-matricula.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MatriculasService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateMatriculaDto) {
    return this.prisma.matricula.create({
      data,
    });
  }

  findAll() {
    return this.prisma.matricula.findMany();
  }

  findOne(id: number) {
    return this.prisma.matricula.findUnique({
      where: { id },
    });
  }

  update(id: number, data: UpdateMatriculaDto) {
    return this.prisma.matricula.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.matricula.delete({
      where: { id },
    });
  }
}
