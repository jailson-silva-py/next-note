# 📝 NextNote

<div align="center">

![NextNote Logo](https://img.shields.io/badge/Next-Note-5b115b?style=for-the-badge&logo=next.js&logoColor=white)

**A aplicação de notas mais rápida e elegante do universo Next.js**

[![Live Demo](https://img.shields.io/badge/🚀_DEMO_AO_VIVO-5b115b?style=for-the-badge)](https://next-note-gcjx.vercel.app)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)

[🎯 Features](#-features) • [🚀 Demo](#-demo-ao-vivo) • [⚡ Tech Stack](#-tech-stack) • [🛠️ Instalação](#️-instalação) • [📖 Como Usar](#-como-usar)

</div>

---

## 🌟 Sobre o Projeto

**NextNote** é uma aplicação moderna de gerenciamento de notas construída com as tecnologias mais recentes do ecossistema Next.js. Combina velocidade, elegância e funcionalidades avançadas para oferecer a melhor experiência possível ao usuário.

### 💡 Por que NextNote?

- ⚡ **Extremamente Rápido**: Aproveita SSR, ISR e Client-Side Rendering do Next.js 15
- 🎨 **Personalização Total**: Temas, fontes, cores - tudo ao seu gosto
- 🤖 **IA Integrada**: Chat com IA para resumir e interagir com suas notas
- 🔐 **Seguro**: Autenticação robusta com múltiplos providers
- 📱 **Responsivo**: Funciona perfeitamente em qualquer dispositivo
- 🌙 **Dark Mode**: Modo escuro nativo e elegante

---

## 🎯 Features

### 🔥 Core Features

- ✅ **CRUD Completo de Notas** - Crie, leia, edite e delete notas com facilidade
- 🔍 **Busca Avançada** - Pesquise por título ou descrição em tempo real
- 📄 **Paginação Inteligente** - Navegue por suas notas sem sobrecarregar a aplicação
- 👁️ **Modo Visualização** - Leia suas notas sem distrações
- 🗑️ **Modo Deleção Seguro** - Delete múltiplas notas com confirmação

### 🎨 Personalização

- 🌓 **Dark/Light Mode** - Alterne entre temas com um clique
- 🎭 **7 Famílias de Fonte** - Roboto, Bad Script, Creepster, Montserrat, Open Sans, Urbanist, Allura
- 🎨 **Cores Customizáveis** - Escolha suas cores primária e secundária
- 📏 **Tamanho de Fonte Ajustável** - De 22px a 48px

### 🔐 Autenticação

- 🔑 **NextAuth v5** - Sistema de autenticação robusto
- 🌐 **Múltiplos Providers**:
  - Google OAuth
  - GitHub OAuth
  - Discord OAuth
- 👤 **Perfil Customizável** - Edite nome e foto de perfil
- 🖼️ **Upload de Imagens** - Suporte a imagens até 5MB

### 🤖 IA Features

- 💬 **Chat com IA** - Converse sobre suas notas com DeepSeek V3.1
- ⚡ **Respostas Rápidas** - Processa e responde em segundos
- 📊 **Markdown Support** - Respostas formatadas com React Markdown

---

## 🚀 Demo ao Vivo

**Experimente agora**: [https://next-note-gcjx.vercel.app](https://next-note-gcjx.vercel.app)

### 📸 Screenshots

```
🏠 Home → 📝 Notas → ✏️ Editor → 🤖 IA Chat → ⚙️ Preferências
```

---

## ⚡ Tech Stack

### Frontend
- **Next.js 15.5.2** - React Framework com App Router
- **React 19.1.0** - Biblioteca UI
- **TypeScript 5** - Tipagem estática
- **CSS Modules** - Estilos encapsulados
- **React Icons** - Ícones consistentes
- **React Markdown** - Renderização de markdown

### Backend
- **Next.js Server Actions** - API serverless
- **NextAuth v5** - Autenticação
- **Prisma 6** - ORM moderno
- **Turso (LibSQL)** - Banco de dados distribuído
- **Supabase (supabase.js)** - Storage(cloud para salvar imagens do profile)

### DevOps & Tools
- **Vercel** - Deploy e hosting
- **Vitest** - Testes unitários
- **Cypress** - Testes E2E
- **ESLint** - Linting
- **next-themes** - Gerenciamento de temas

---

## 🛠️ Instalação

### Pré-requisitos

- Node.js 20+ 
- npm/yarn/pnpm
- Conta Turso (ou outro banco compatível)
- Credenciais OAuth (Google/GitHub/Discord)

### 📦 Passo a Passo

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/next-note.git
cd next-note
```

2. **Instale as dependências**
```bash
npm install
# ou
pnpm install
# ou
yarn install
```

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env.local`:

```env
# Database (Turso)
TURSO_DATABASE_URL="libsql://seu-banco.turso.io"
TURSO_AUTH_TOKEN="seu-token-turso"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="seu-secret-aqui"

# Google OAuth
AUTH_GOOGLE_ID="seu-google-client-id"
AUTH_GOOGLE_SECRET="seu-google-secret"

# GitHub OAuth
AUTH_GITHUB_ID="seu-github-client-id"
AUTH_GITHUB_SECRET="seu-github-secret"

# Discord OAuth
AUTH_DISCORD_ID="seu-discord-client-id"
AUTH_DISCORD_SECRET="seu-discord-secret"

# IA API (opcional)
API_URL="https://api.deepseek.com/v1/chat/completions"
API_KEY="seu-api-key"
```

4. **Configure o banco de dados**
```bash
npx prisma generate
npx prisma db push
```

5. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

6. **Acesse a aplicação**
```
http://localhost:3000
```

---

## 📖 Como Usar

### 1️⃣ Faça Login
- Clique em "Entrar" no canto superior direito
- Escolha um dos providers disponíveis
- Autorize o acesso

### 2️⃣ Crie sua Primeira Nota
- Clique no botão `+` no menu lateral
- Preencha título (mínimo 8 caracteres)
- Adicione descrição (mínimo 15 caracteres)
- Clique em "Criar"

### 3️⃣ Gerencie suas Notas
- **Editar**: Clique na nota → Ative o modo edição com o ícone de lápis
- **Visualizar**: Use o ícone de olho para modo leitura
- **Deletar**: Ative o modo deleção e clique nas notas desejadas
- **Buscar**: Use a barra de pesquisa no topo

### 4️⃣ Personalize
- Clique no seu avatar → "Preferências"
- Escolha fonte, cores e tamanho de texto
- Alterne entre tema claro/escuro

### 5️⃣ Use a IA (Opcional)
- Acesse "Resumo com IA" no menu
- Faça perguntas sobre suas notas
- Receba respostas formatadas em markdown

---

## 🧪 Testes

### Testes Unitários (Vitest)
```bash
# Rodar todos os testes
npm run test

# Modo watch
npm run test:watch

# Com UI
npm run test:ui

# Cobertura
npm run test:coverage
```

### Testes E2E (Cypress)
```bash
npm run cy:open
```

---

## 📁 Estrutura do Projeto

```
next-note/
├── src/
│   ├── app/              # App Router (Next.js 15)
│   │   ├── api/          # API Routes
│   │   ├── todos/        # Páginas de notas
│   │   ├── ia/           # Chat com IA
│   │   ├── profile/      # Perfil do usuário
│   │   └── layout.tsx    # Layout principal
│   ├── components/       # Componentes React
│   │   ├── Form/
│   │   ├── Modal/
│   │   ├── NavBar/
│   │   ├── Toast/
│   │   └── ...
│   ├── hooks/            # Custom Hooks
│   │   ├── useCustomParams.ts
│   │   ├── useFontFamily.ts
│   │   └── useColorVariable.ts
│   ├── types/            # TypeScript Types
│   └── actions.ts        # Server Actions
├── prisma/               # Schema do banco
├── public/               # Assets estáticos
└── tests/                # Testes E2E

```

---

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório no [Vercel](https://vercel.com)
2. Configure as variáveis de ambiente
3. Deploy automático a cada push!

### Outras Plataformas

O projeto é compatível com qualquer plataforma que suporte Next.js:
- Netlify
- Railway
- Render
- AWS Amplify

---

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! 

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📝 Roadmap

- [ ] PWA Support
- [ ] Compartilhamento de notas
- [ ] Tags e categorias
- [ ] Exportar notas (PDF, Markdown)
- [ ] Modo colaborativo
- [ ] Rich text editor
- [ ] Anexos e imagens nas notas
- [ ] API pública
- [ ] App mobile (React Native)

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

Desenvolvido com 💜 e ☕ por um programador visionário.

**Live Demo**: [https://next-note-gcjx.vercel.app](https://next-note-gcjx.vercel.app)

---

## 🙏 Agradecimentos

- [Next.js Team](https://nextjs.org/) - Framework incrível
- [Vercel](https://vercel.com/) - Hosting impecável
- [Prisma](https://www.prisma.io/) - ORM maravilhoso
- [Turso](https://turso.tech/) - Banco de dados distribuído
- Comunidade Open Source 🚀
