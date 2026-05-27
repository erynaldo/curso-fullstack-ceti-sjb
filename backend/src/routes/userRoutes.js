const router = require('express').Router();
const auth = require('../middleware/auth');
const { getMe } = require('../controllers/userController');

const pool = require('../config/db');

router.get('/me', auth, getMe);

// const db = require('../config/db');

router.patch('/:id/confirm-name', async (req, res) => {
    const { id } = req.params;
    const { confirmacao } = req.body;

    try {
        // Usando a sintaxe do 'pg' (pool.query)
        const query = 'UPDATE users SET confirmacao = $1 WHERE id = $2';
        const result = await pool.query(query, [confirmacao, id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.status(200).json({ message: 'Confirmação registrada!' });
    } catch (error) {
        console.error("Erro no SQL:", error);
        res.status(500).json({ error: 'Erro ao atualizar banco de dados' });
    }
});

module.exports = router;