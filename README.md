# 🧩 Teste Fullstack — CRUD em (NestJS + React + Docker)

Este projeto é um CRUD Fullstack desenvolvido como teste técnico, utilizando **NestJS** no backend e **React (Vite)** no frontend, ambos rodando em contêineres Docker.  
O sistema permite **criar, listar, editar e excluir itens**, com paginação, busca e ordenação.

---

## 🚀 Tecnologias Utilizadas

### Backend
- [NestJS](https://nestjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Jest](https://jestjs.io/) — testes unitários
- [Swagger](https://swagger.io/) — documentação da API

### Frontend
- [React + Vite](https://vitejs.dev/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Axios](https://axios-http.com/)

### Infra
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## 🐳 Estrutura de Contêineres

| Serviço     | Porta | Descrição |
|--------------|--------|-----------|
| **backend**  | 3001   | API NestJS com Prisma e Swagger |
| **frontend** | 5173   | UI React com Vite |
| **db**       | 5432   | Banco de dados PostgreSQL |

---

## 📦 Estrutura de Pastas

```text
root/
├── backend/
│   ├── src/
│   │   ├── alunos/
│   │   │   ├── alunos.controller.ts
│   │   │   ├── alunos.service.ts
│   │   │   ├── alunos.module.ts
│   │   │   └── dto/
│   │   ├── cursos/
│   │   │   ├── cursos.controller.ts
│   │   │   ├── cursos.service.ts
│   │   │   ├── cursos.module.ts
│   │   │   └── dto/
│   │   ├── matriculas/
│   │   │   ├── matriculas.controller.ts
│   │   │   ├── matriculas.service.ts
│   │   │   ├── matriculas.module.ts
│   │   │   └── dto/
│   │   ├── logs/
│   │   │   ├── logs.controller.ts
│   │   │   ├── logs.service.ts
│   │   │   ├── logs.module.ts
│   │   │   └── dto/
│   │   └── main.ts
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   └── services/
│   ├── Dockerfile
│   └── vite.config.ts
├── docker-compose.yml
└── README.md
```

---

## ⚙️ Configuração do ambiente

1. Clonar o repositório
```bash
git clone git@github.com:KleversonEller/Case-Principia.git
cd Case-Principia
```

2. Substitua o .env.example por .env
```bash
cd frontend
mv .env.example .env
```

3. Ter o docker compose instalado

```bash
docker compose version
```
OU
```bash
docker-compose --version
```

Caso não tenha o docker intalado instale seguindo a [documentação](https://docs.docker.com/compose/install/#installation-scenarios)

4. Subir o ambiente com Docker
```bash
docker-compose up -d
```
OU
```bash
docker compose up -d
```

⚠️ Atenção: Apos rodar o comando acima e obter o feedback "Done/Started" aguarde cerca de 1 minutos antes de acessar os links abaixo.

Durante esse tempo, as dependências dos containers ainda estarão sendo inicializadas — evite fechar o terminal ou encerrar a execução.

Pode-se acompanha os logs da inicialização executando o seguinte comando:
```bash
docker compose logs -f backend
```

URLs após subir:
- 🌐 API: http://localhost:3001
- 📘 Swagger: http://localhost:3001/api/docs
- 💻 Página Web: http://localhost:5173

---

## 🧪 Testes

Backend (Jest)
```bash
docker exec -it nestjs_app npm run test
```
Cobertura de testes inclui:
- Criação de alunos/cursos/matriculas
- Listagem
- Atualização e exclusão
- Validação de erros 404

---

## 🧭 Convenção de commits

| Tipo     | Uso                                      | Exemplo                                       |
|----------|------------------------------------------|-----------------------------------------------|
| feat     | Nova funcionalidade                       | feat: implement item pagination               |
| fix      | Correção de bug                           | fix: adjust wrong status validation           |
| chore    | Infraestrutura e setup                    | chore: setup docker-compose                   |
| refactor | Refatoração sem mudança funcional         | refactor: simplify item service logic         |
| docs     | Documentação                              | docs: add README instructions                 |
| test     | Criação ou ajuste de testes               | test: add unit tests for Item service         |

---

## 🧠 Extras implementados
- Seeds automáticos via Prisma
- Logs estruturados (NestJS Logger)
- Paginação
- Testes unitários em backend

---

## 🏁 Finalizando

Inicie tudo com:
```bash
docker-compose up -d
```
Para visualizar os logs:
```bash
docker compose logs -f backend
```
Para rodar os testes:
```bash
docker exec -it nestjs_app npm run test
```

Acesse:
- Frontend: http://localhost:5173
- API Swagger: http://localhost:3001/api/docs
- Pagina Web: http://localhost:5173

---

Autor: Kleverson Eller  
Data: 2025  
Licença: MIT
