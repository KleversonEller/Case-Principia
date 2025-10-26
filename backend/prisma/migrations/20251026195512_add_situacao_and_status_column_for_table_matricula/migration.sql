-- AlterTable
ALTER TABLE "Matricula" ADD COLUMN     "situacao" TEXT NOT NULL DEFAULT 'pendente',
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pendente';

-- CreateIndex
CREATE INDEX "Matricula_situacao_idx" ON "Matricula"("situacao");

-- CreateIndex
CREATE INDEX "Matricula_status_idx" ON "Matricula"("status");
