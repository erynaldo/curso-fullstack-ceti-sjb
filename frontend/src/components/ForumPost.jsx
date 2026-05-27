import api from '../api/axios';

export default function ForumPost({ post, onReaction }) {

  const react = async (type) => {
    try {
      await api.post(`/forum/${post.id}/reaction`, {
        type,
      });

      onReaction();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-user">
          {post.author_name}
        </div>

        <div className="post-date">
          {new Date(post.created_at).toLocaleDateString('pt-BR')}
        </div>
      </div>

      <div className="post-content">
        {post.content}
      </div>

      <div className="post-actions">
        <button
          className="reaction-btn"
          onClick={() => react('heart')}
        >
          ❤️ {post.hearts.length}
        </button>

        <button
          className="reaction-btn"
          onClick={() => react('like')}
        >
          👍 {post.likes.length}
        </button>
      </div>
    </div>
  );
}