const pool = require('../config/db');

// Lista todos os posts com contagem de reações e nomes de quem reagiu
exports.listPosts = async (req, res) => {
  const { rows } = await pool.query(`
    SELECT
      fp.id, fp.content, fp.created_at,
      u.name AS author_name,
      (SELECT COALESCE(json_agg(json_build_object('user_id', r.user_id, 'user_name', ru.name))
         FROM reactions r JOIN users ru ON ru.id = r.user_id
         WHERE r.post_id = fp.id AND r.type = 'heart') , '[]') AS hearts,
      (SELECT COALESCE(json_agg(json_build_object('user_id', r.user_id, 'user_name', ru.name))
         FROM reactions r JOIN users ru ON ru.id = r.user_id
         WHERE r.post_id = fp.id AND r.type = 'like') , '[]') AS likes
    FROM forum_posts fp
    JOIN users u ON u.id = fp.user_id
    ORDER BY fp.created_at DESC
  `);
  res.json(rows);
};

// Criar post
exports.createPost = async (req, res) => {
  const { content } = req.body;
  if (!content?.trim()) return res.status(400).json({ error: 'Conteúdo obrigatório' });

  const { rows } = await pool.query(
    'INSERT INTO forum_posts (user_id, content) VALUES ($1, $2) RETURNING *',
    [req.user.id, content.trim()]
  );
  res.status(201).json(rows[0]);
};

// Reagir (toggle): se já existir remove, senão adiciona
exports.toggleReaction = async (req, res) => {
  const { postId } = req.params;
  const { type } = req.body; // 'heart' | 'like'

  if (!['heart', 'like'].includes(type))
    return res.status(400).json({ error: 'Tipo inválido' });

  const { rows } = await pool.query(
    'SELECT id FROM reactions WHERE post_id=$1 AND user_id=$2 AND type=$3',
    [postId, req.user.id, type]
  );

  if (rows.length) {
    await pool.query('DELETE FROM reactions WHERE id=$1', [rows[0].id]);
    return res.json({ action: 'removed' });
  }

  await pool.query(
    'INSERT INTO reactions (post_id, user_id, type) VALUES ($1,$2,$3)',
    [postId, req.user.id, type]
  );
  res.json({ action: 'added' });
};