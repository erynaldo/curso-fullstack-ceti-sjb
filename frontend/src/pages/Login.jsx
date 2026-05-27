import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ matricula: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Estado para visibilidade

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.matricula, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-5">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-300/80 border border-slate-100 p-5">

        <div className="">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight text-center mb-8">Login</h2>
        </div>

        {error && (
          <div className="mb-6 px-2 py-2 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm font-medium tracking-wider">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Usuário</label>
            <input
              name="matricula" value={form.matricula} onChange={handleChange} required
              className="w-full px-4 py-3 bg-slate-50 tracking-wider border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition-all"
              placeholder="Ex: 81756352"
            />
            <label className="block text-xs text-red-500 tracking-wider mb-2">O usuário é o número do seu celular sem o DDD e sem o 9</label>

          </div>

          <div className="relative">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Senha</label>
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-slate-50 tracking-wide border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition-all"
              placeholder="•••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-1 top-[32px] text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showPassword ? 'OCULTAR' : 'MOSTRAR'}
            </button>
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full py-3 tracking-wide bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 mt-2 shadow-lg shadow-slate-900/20"
          >
            {loading ? 'Carregando...' : 'Entrar'}
          </button>
        </form>

        <div className="mt-2 pt-6 text-center space-y-3">
          <p className="text-sm text-slate-600">
            Não tem uma conta?{' '}
            <Link to="/cadastro" className="text-slate-900 font-semibold hover:underline">Cadastre-se</Link>
          </p>
          <Link to="/" className="text-sm text-slate-500 hover:text-slate-600 transition-colors">
            Voltar para o início
          </Link>
        </div>
      </div>
    </div>
  );
}