import { useState } from 'react';
import api from '../api/axios';

export default function ForumForm({ onPost }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    if (!content.trim()) {
      setMessage('Digite alguma mensagem');
      return;
    }

    setLoading(true);

    try {
      await api.post('/forum', {
        content,
      });

      setContent('');
      setMessage('Comentário publicado com sucesso');

      if (onPost) {
        onPost();
      }
    } catch (err) {
      console.error(err);

      setMessage(
        err?.response?.data?.error ||
        'Erro ao publicar comentário'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forum-form">
      <textarea
        placeholder="Compartilhe sua dúvida com a turma..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Publicando...' : 'Publicar'}
      </button>

      {message && (
        <p className="form-message">{message}</p>
      )}
    </div>
  );
}