import { Module } from '@nestjs/common';
import { CursosService } from './cursos.service';
import { CursosController } from './cursos.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [PrismaModule, LogsModule],
  controllers: [CursosController],
  providers: [CursosService],
})
export class CursosModule {}
