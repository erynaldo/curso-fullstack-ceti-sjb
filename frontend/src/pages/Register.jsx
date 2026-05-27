import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:'', matricula:'', password:'', confirmPassword:'' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword)
      return setError('As senhas não coincidem');
    setLoading(true);
    try {
      await api.post('/auth/register', form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao cadastrar');
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name:'name',            label:'Nome completo',    type:'text',     placeholder:'Seu nome completo' },
    { name:'matricula',       label:'CPF',              type:'text',     placeholder:'Sem pontos ou traços' },
    { name:'password',        label:'Senha',            type:'password', placeholder:'••••••••' },
    { name:'confirmPassword', label:'Confirmar senha',  type:'password', placeholder:'••••••••' },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-5">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-300/80 border border-slate-100 p-5">
        
        <div className="">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight text-center mb-4">Criar conta</h2>
          <p className="text-slate-500 text-sm mb-4">Preencha os dados abaixo para se cadastrar.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {fields.map(f => (
            <div key={f.name} className="relative">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{f.label}</label>
              <input
                name={f.name} 
                type={f.name.includes('password') ? (showPassword ? 'text' : 'password') : f.type} 
                value={form[f.name]}
                onChange={handleChange} 
                required
                placeholder={f.placeholder}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition-all"
              />
              {f.name === 'password' && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-1 top-[32px] text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? 'OCULTAR' : 'MOSTRAR'}
                </button>
              )}
            </div>
          ))}
          
          <button
            type="submit" disabled={loading}
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 mt-2 shadow-lg shadow-slate-900/20"
            disabled
          >
            {loading ? 'Cadastrando...' : 'Criar conta'}
          </button>
        </form>

        <div className="mt-2 pt-6 text-center space-y-3">
          <p className="text-sm text-slate-600">
            Já tem uma conta?{' '}
            <Link to="/login" className="text-slate-900 font-semibold hover:underline">Entrar</Link>
          </p>
          <Link to="/" className="text-sm text-slate-500 hover:text-slate-600 transition-colors">
            Voltar para o início
          </Link>
        </div>
      </div>
    </div>
  );
}