const express = require('express');
const cors    = require('cors');
const app     = express();

// acesso ao backend localmente
// app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// acesso ao backend no Render
app.use(cors({ origin: 'https://curso-dev-ceti.onrender.com'}));
app.use(express.json());

app.use('/api/auth',  require('./routes/authRoutes'));
app.use('/api/user',  require('./routes/userRoutes'));
app.use('/api/forum', require('./routes/forumRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use(
  '/api/certificates',
  require('./routes/certificateRoutes')
);

module.exports = app;