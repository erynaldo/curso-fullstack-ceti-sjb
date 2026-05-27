const pool    = require('../config/db');
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');

// Cadastro
exports.register = async (req, res) => {
  const { name, matricula, password, confirmPassword } = req.body;

  if (!name || !matricula || !password || !confirmPassword)
    return res.status(400).json({ error: 'Preencha todos os campos' });

  if (password !== confirmPassword)
    return res.status(400).json({ error: 'As senhas não coincidem' });

  try {
    // Verifica se já existe algum usuário → se não, o novo será admin
    const { rows: existing } = await pool.query('SELECT id FROM users LIMIT 1');
    const role = existing.length === 0 ? 'admin' : 'student';

    const hash = await bcrypt.hash(password, 10);
    const { rows } = await pool.query(
      'INSERT INTO users (name, matricula, password, role) VALUES ($1,$2,$3,$4) RETURNING id, name, matricula, role',
      [name, matricula, hash, role]
    );
    res.status(201).json({ user: rows[0] });
  } catch (err) {
    if (err.code === '23505')
      return res.status(409).json({ error: 'Matrícula já cadastrada' });
    res.status(500).json({ error: 'Erro interno' });
  }
};

// Login
exports.login = async (req, res) => {
  const { matricula, password } = req.body;
  if (!matricula || !password)
    return res.status(400).json({ error: 'Preencha todos os campos' });

  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE matricula = $1', [matricula]);
    if (!rows.length) return res.status(401).json({ error: 'Credenciais inválidas' });

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Credenciais inválidas' });

    const token = jwt.sign(
      { id: user.id, name: user.name, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );
    res.json({ token, user: { id: user.id, name: user.name, role: user.role, hours_done: user.hours_done } });
  } catch {
    res.status(500).json({ error: 'Erro interno' });
  }
};