<div align="center">

# ✂️ Salão Agendamento

### Plataforma completa de agendamento para salões de beleza

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

</div>

---

## 📋 Sobre o Projecto

**Salão Agendamento** é uma plataforma web fullstack para gestão de salões de beleza. Permite que clientes façam agendamentos online e que administradores gerem serviços, profissionais e horários através de um painel intuitivo.

---

## ✨ Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| 📅 **Agendamento Online** | Clientes agendam serviços de forma fácil e rápida |
| 🔐 **Autenticação JWT** | Login seguro com tokens de acesso e refresh |
| 🛠️ **Painel Admin** | Gestão completa de serviços, profissionais e horários |
| 🖼️ **Upload de Imagens** | Fotos de perfil e portfólio dos profissionais |
| 📧 **Verificação por Email** | Confirmação de conta via email (Nodemailer) |

---

## 🗂️ Estrutura do Projecto

```
salão-agendamento/
├── 📁 frontend/              # Next.js 15 — Interface do utilizador
│   ├── src/
│   │   ├── app/              # App Router (páginas e layouts)
│   │   ├── components/       # Componentes reutilizáveis
│   │   └── services/         # Chamadas à API
│   └── package.json
│
└── 📁 backend/               # Node.js + Express — API REST
    ├── src/
    │   ├── controllers/      # Controladores das rotas
    │   ├── services/         # Lógica de negócio
    │   ├── router/           # Definição das rotas
    │   ├── utils/            # Utilitários (JWT, uploads, etc.)
    │   └── types/            # Tipos TypeScript personalizados
    ├── prisma/
    │   └── schema.prisma     # Esquema da base de dados
    └── package.json
```

---

## 🚀 Como Executar Localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) >= 18
- [PostgreSQL](https://www.postgresql.org/) instalado e a correr
- [Git](https://git-scm.com/)

---

### 1. Clonar o repositório

```bash
git clone https://github.com/alcada72/sistema-de-agendamento-salao-.git
cd sistema-de-agendamento-salao-
```

---

### 2. Configurar o Backend

```bash
cd backend
npm install
```

Cria o ficheiro `.env` na pasta `backend/`:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/salao_db"
JWT_SECRET="o_teu_segredo_aqui"
JWT_REFRESH_SECRET="o_teu_refresh_segredo_aqui"
EMAIL_USER="o_teu_email@gmail.com"
EMAIL_PASS="a_tua_senha_de_app"
PORT=3001
```

Aplica as migrações e gera o cliente Prisma:

```bash
npx prisma migrate dev
npx prisma generate
```

Inicia o servidor:

```bash
npm run dev
```

> API disponível em `http://localhost:3001`

---

### 3. Configurar o Frontend

```bash
cd ../frontend
npm install
```

Cria o ficheiro `.env.local` na pasta `frontend/`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Inicia a aplicação:

```bash
npm run dev
```

> Interface disponível em `http://localhost:3000`
> Deploy disponível em `https://sistema-de-agendamento-salao-gray.vercel.app`


---

## 🛠️ Stack Tecnológica

### Frontend
- **[Next.js 15](https://nextjs.org/)** — Framework React com App Router
- **[TypeScript](https://www.typescriptlang.org/)** — Tipagem estática
- **[Tailwind CSS](https://tailwindcss.com/)** — Estilização utilitária

### Backend
- **[Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)** — Servidor HTTP
- **[TypeScript](https://www.typescriptlang.org/)** — Tipagem estática
- **[Prisma ORM](https://www.prisma.io/)** — Gestão da base de dados
- **[PostgreSQL](https://www.postgresql.org/)** — Base de dados relacional
- **[JWT](https://jwt.io/)** — Autenticação segura
- **[Multer](https://github.com/expressjs/multer)** — Upload de ficheiros
- **[Nodemailer](https://nodemailer.com/)** — Envio de emails

---

## 📡 Deploy

O projecto está configurado para deploy no **[Render](https://render.com/)**:

- **Backend**: Web Service com build `npm install && npx prisma generate && npm run build`
- **Frontend**: Static Site ou Web Service com Next.js
- **Base de dados**: PostgreSQL gerido pelo Render


---

## 📄 Licença

Este projecto está sob a licença **MIT**. Consulta o ficheiro [LICENSE](LICENSE) para mais detalhes.

---

<div align="center">

Feito com ❤️ para a JMC

</div>
