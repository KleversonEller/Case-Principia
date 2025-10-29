import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class LogsService {
  constructor(private prisma: PrismaService) {}

  async create(descricao: string, contexto?: string) {
    return await this.prisma.log.create({
      data: { descricao, contexto },
    });
  }
}
