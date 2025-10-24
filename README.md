# 🧩 Teste Fullstack — CRUD de Itens (NestJS + React + Docker)

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
- [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/)

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
| **pgadmin** *(opcional)* | 8080 | Interface web para PostgreSQL |

---

## 📦 Estrutura de Pastas

```text
root/
├── backend/
│   ├── src/
│   │   ├── items/
│   │   │   ├── items.controller.ts
│   │   │   ├── items.service.ts
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
git clone https://github.com/seuusuario/teste-fullstack.git
cd teste-fullstack
```

2. Configurar variáveis de ambiente

Backend — backend/.env
```env
DATABASE_URL="postgresql://postgres:postgres@db:5432/items_db?schema=public"
PORT=3001
```

Frontend — frontend/.env
```env
VITE_API_BASE_URL=http://localhost:3001
```

3. Subir o ambiente com Docker
```bash
docker-compose up --build
```

URLs após subir:
- API: http://localhost:3001
- Swagger: http://localhost:3001/api
- Frontend: http://localhost:5173

---

## 🧱 Banco de Dados (Prisma)

Rodar migrations e seeds:
```bash
docker exec -it backend npx prisma migrate deploy
docker exec -it backend npx prisma db seed
```

Acessar Prisma Studio (opcional):
```bash
docker exec -it backend npx prisma studio
```

---

## 🧪 Testes

Backend (Jest)
```bash
docker exec -it backend npm run test
```
Cobertura de testes inclui:
- Criação de item (válido/inválido)
- Listagem com paginação e busca
- Atualização e deleção
- Validação de campos e erros 404

Frontend (Vitest)
```bash
docker exec -it frontend npm run test
```
Cobertura de testes inclui:
- Store (Zustand): atualização de estado
- Lista: renderização, busca e paginação
- Formulário: validação e envio
- Exclusão: confirmação e remoção na UI

---

## 🔍 Endpoints principais (API REST)

| Método | Rota                                 | Descrição                          |
|--------|--------------------------------------|------------------------------------|
| GET    | /items?search=&page=1&limit=10&sort=createdAt&order=desc | Lista itens                        |
| GET    | /items/:id                           | Buscar item por ID                 |
| POST   | /items                               | Criar item ({ name, status })      |
| PATCH  | /items/:id                           | Atualizar item                     |
| DELETE | /items/:id                           | Remover item                       |

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

## 🧱 Build manual (sem Docker)

Backend
```bash
cd backend
npm install
npx prisma migrate dev
npm run start:dev
```

Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 🧠 Extras implementados
- Seeds automáticos via Prisma
- Logs estruturados (NestJS Logger)
- Paginação e ordenação múltipla
- Filtros persistentes na URL (frontend)
- Feedbacks/toasts de sucesso e erro
- Testes unitários em backend e frontend

---

## 🏁 Finalizando

Inicie tudo com:
```bash
docker-compose up --build
```

Acesse:
- Frontend: http://localhost:5173
- API Swagger: http://localhost:3001/api

Autor: Seu Nome Aqui  
Data: 2025  
Licença: MIT