const pool = require('../config/db');

// Retorna dados do usuário logado
exports.getMe = async (req, res) => {
  const { rows } = await pool.query(
    'SELECT id, name, matricula, role, hours_done, created_at FROM users WHERE id = $1',
    [req.user.id]
  );
  if (!rows.length) return res.status(404).json({ error: 'Usuário não encontrado' });
  res.json(rows[0]);
};