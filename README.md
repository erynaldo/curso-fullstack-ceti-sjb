formacao-dev/                         # raiz do monorepo
├── frontend/                           # React + TailwindCSS + Vite
│   ├── public/
│   │   └── favicon.ico
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js               # instância Axios + interceptors JWT
│   │   ├── components/
│   │   │   ├── Header.jsx              # cabeçalho do painel do aluno
│   │   │   ├── Footer.jsx              # rodapé
│   │   │   ├── StatsCard.jsx           # card de horas/aulas
│   │   │   ├── ProgressChart.jsx       # gráfico de frequência (Recharts)
│   │   │   ├── ForumPost.jsx           # card de post do fórum
│   │   │   ├── ForumForm.jsx           # formulário de novo post
│   │   │   └── ProtectedRoute.jsx      # guard de rota autenticada
│   │   ├── context/
│   │   │   └── AuthContext.jsx         # contexto global de autenticação
│   │   ├── pages/
│   │   │   ├── Home.jsx                # página inicial (landing)
│   │   │   ├── Login.jsx               # login com matrícula + senha
│   │   │   ├── Register.jsx            # cadastro de usuário
│   │   │   ├── Dashboard.jsx           # painel do aluno (cards + fórum)
│   │   │   └── AdminPanel.jsx          # painel administrativo (só admin)
│   │   ├── App.jsx                     # rotas React Router v6
│   │   └── main.jsx                    # entry-point + StrictMode
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── backend/                            # Node.js + Express + PostgreSQL
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                   # conexão Neon (pg Pool)
│   │   ├── controllers/
│   │   │   ├── authController.js       # login, cadastro, JWT
│   │   │   ├── userController.js       # perfil, progresso de horas
│   │   │   ├── forumController.js      # CRUD posts + curtir + like
│   │   │   └── adminController.js      # funções de admin
│   │   ├── middleware/
│   │   │   ├── auth.js                 # verifica JWT
│   │   │   └── isAdmin.js              # verifica role admin
│   │   ├── routes/
│   │   │   ├── authRoutes.js           # POST /register /login
│   │   │   ├── userRoutes.js           # GET /me, PATCH /progress
│   │   │   ├── forumRoutes.js          # CRUD /forum, /reactions
│   │   │   └── adminRoutes.js          # GET /users, PATCH /hours
│   │   └── app.js                      # Express + middleware + rotas
│   ├── migrations/
│   │   └── 001_init.sql               # DDL: users, posts, reactions
│   ├── server.js                       # ponto de entrada (listen)
│   ├── .env.example                    # DATABASE_URL, JWT_SECRET...
│   └── package.json
│
└── README.md                           # instruções de setup