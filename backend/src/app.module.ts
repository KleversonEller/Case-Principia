import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlunosModule } from './alunos/alunos.module';
import { CursosModule } from './cursos/cursos.module';
import { MatriculasModule } from './matriculas/matriculas.module';
import { PrismaModule } from '../prisma/prisma.module';
import { LogsModule } from './logs/logs.module';

@Module({
  imports: [AlunosModule, CursosModule, MatriculasModule, PrismaModule, LogsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
