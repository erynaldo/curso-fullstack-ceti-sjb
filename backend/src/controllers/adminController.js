const pool = require('../config/db');

// Lista todos os usuários
exports.listUsers = async (req, res) => {
  const { rows } = await pool.query(
    'SELECT id, name, matricula, role, hours_done, created_at FROM users ORDER BY created_at'
  );
  res.json(rows);
};

// Atualiza horas concluídas de um aluno (0–16)
exports.updateHours = async (req, res) => {
  const { userId } = req.params;
  const { hours_done } = req.body;

  if (hours_done < 0 || hours_done > 16)
    return res.status(400).json({ error: 'Horas deve ser entre 0 e 16' });

  const { rows } = await pool.query(
    'UPDATE users SET hours_done=$1 WHERE id=$2 RETURNING id, name, hours_done',
    [hours_done, userId]
  );
  if (!rows.length) return res.status(404).json({ error: 'Usuário não encontrado' });
  res.json(rows[0]);
};