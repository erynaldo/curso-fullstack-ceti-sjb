import React, { useState } from 'react';
import { ThumbsUp } from 'lucide-react';
import api from '../api/axios'; // Importando a instância do axios

const ButtonCurtir = ({ userId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleLike = async () => {
    if (isLiked) return; // Se já estiver confirmado, não faz nada

    setLoading(true);
    try {
      // Envia a atualização para o backend
      await api.patch(`/user/${userId}/confirm-name`, { 
        confirmacao: 'confirmado' 
      });
      
      setIsLiked(true);
    } catch (error) {
      console.error("Erro ao confirmar nome:", error);
      alert("Erro ao enviar confirmação. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={toggleLike}
      disabled={isLiked || loading}
      style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '18px',
        gap: '8px',
        padding: '6px 14px',
        backgroundColor: isLiked ? '#e0f2fe' : '#e9eaeb',
        border: '1px solid',
        borderColor: isLiked ? '#3b82f6' : '#518be1',
        borderRadius: '8px',
        cursor: isLiked ? 'default' : 'pointer',
        transition: 'all 0.2s ease',
        color: isLiked ? '#2563eb' : '#374151',
        opacity: loading ? 0.6 : 1
      }}
    >
      <ThumbsUp size={20} fill={isLiked ? '#3b82f6' : 'none'} />
      <span>{loading ? 'Enviando...' : (isLiked ? 'Confirmado' : 'Confirmar')}</span>
    </button>
  );
};

export default ButtonCurtir;