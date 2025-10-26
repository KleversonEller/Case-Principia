/*
  Warnings:

  - You are about to drop the column `data` on the `Matricula` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Aluno" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Curso" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Matricula" DROP COLUMN "data",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Log" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "contexto" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Log_createdAt_idx" ON "Log"("createdAt");

-- CreateIndex
CREATE INDEX "Log_contexto_idx" ON "Log"("contexto");

-- CreateIndex
CREATE INDEX "Aluno_createdAt_idx" ON "Aluno"("createdAt");

-- CreateIndex
CREATE INDEX "Aluno_nome_idx" ON "Aluno"("nome");

-- CreateIndex
CREATE INDEX "Curso_createdAt_idx" ON "Curso"("createdAt");

-- CreateIndex
CREATE INDEX "Curso_nome_idx" ON "Curso"("nome");

-- CreateIndex
CREATE INDEX "Matricula_createdAt_idx" ON "Matricula"("createdAt");
