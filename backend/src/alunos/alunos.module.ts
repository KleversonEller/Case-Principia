import { Module } from '@nestjs/common';
import { AlunosService } from './alunos.service';
import { AlunosController } from './alunos.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [PrismaModule, LogsModule],
  controllers: [AlunosController],
  providers: [AlunosService],
})
export class AlunosModule {}
