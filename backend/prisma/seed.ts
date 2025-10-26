import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Listas de nomes e sobrenomes para gerar alunos realistas
const nomes = [
  'Ana', 'Bruno', 'Carlos', 'Daniela', 'Eduardo', 'Fernanda', 'Gabriel', 'Helena',
  'Igor', 'Juliana', 'Kleber', 'Larissa', 'Marcos', 'Natália', 'Otávio', 'Patrícia',
  'Rafael', 'Sofia', 'Thiago', 'Vanessa', 'Victor', 'Yasmin', 'Lucas', 'Camila',
  'Gustavo', 'Mariana', 'Fernando', 'Beatriz', 'André', 'Isabela'
];

const sobrenomes = [
  'Silva', 'Souza', 'Oliveira', 'Pereira', 'Costa', 'Almeida', 'Rodrigues',
  'Gomes', 'Martins', 'Lima', 'Carvalho', 'Araújo', 'Ribeiro', 'Mendes'
];

function gerarNomeCompleto(): string {
  const nome = nomes[Math.floor(Math.random() * nomes.length)];
  const sobrenome = sobrenomes[Math.floor(Math.random() * sobrenomes.length)];
  return `${nome} ${sobrenome}`;
}

function gerarEmail(nomeCompleto: string, index: number): string {
  return `${nomeCompleto.toLowerCase().replace(' ', '.')}+${index}@example.com`;
}

async function main() {
  // =========================
  // Cursos
  // =========================
  const cursosData = Array.from({ length: 10 }, (_, i) => ({
    nome: `Curso ${i + 1}`,
    descricao: `Descrição do Curso ${i + 1}`,
  }));

for (const curso of cursosData) {
  const cursoExistente = await prisma.curso.findFirst({
    where: { nome: curso.nome }
  });
  if (!cursoExistente) {
    await prisma.curso.create({ data: curso });
  }
}


  const cursos = await prisma.curso.findMany();

  // =========================
  // Alunos
  // =========================
  const alunosData = Array.from({ length: 30 }, (_, i) => {
    const nomeCompleto = gerarNomeCompleto();
    return {
      nome: nomeCompleto,
      email: gerarEmail(nomeCompleto, i + 1),
    };
  });

  for (const aluno of alunosData) {
    await prisma.aluno.upsert({
      where: { email: aluno.email },
      update: {},
      create: aluno,
    });
  }

  const alunos = await prisma.aluno.findMany();

  // =========================
  // Matrículas: cada aluno em 1 ou 2 cursos aleatórios
  // =========================
  for (const aluno of alunos) {
    const shuffledCursos = cursos.sort(() => 0.5 - Math.random());
    const cursosParaMatricular = shuffledCursos.slice(0, 2);

    for (const curso of cursosParaMatricular) {
      await prisma.matricula.upsert({
        where: { id: aluno.id * 10 + curso.id },
        update: {},
        create: {
          alunoId: aluno.id,
          cursoId: curso.id,
          situacao: Math.random() > 0.5 ? 'ativa' : 'cancelada',
          status: Math.random() > 0.5 ? 'cursando' : 'concluido',
        },
      });
    }
  }

  console.log('Seed realista finalizada com 30 alunos, 10 cursos e matrículas aleatórias!');
}

main()
  .catch((e) => {
    console.error('Erro na seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
