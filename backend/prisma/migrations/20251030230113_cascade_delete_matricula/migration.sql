-- DropForeignKey
ALTER TABLE "public"."Matricula" DROP CONSTRAINT "Matricula_alunoId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Matricula" DROP CONSTRAINT "Matricula_cursoId_fkey";

-- AddForeignKey
ALTER TABLE "Matricula" ADD CONSTRAINT "Matricula_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Matricula" ADD CONSTRAINT "Matricula_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso"("id") ON DELETE CASCADE ON UPDATE CASCADE;
