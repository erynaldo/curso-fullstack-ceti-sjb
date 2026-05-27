import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <header className="bg-slate-900 text-slate-100 sticky top-0 z-30">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between text-slate-100">
        <div>
          <h1 className="font-display text-base text-sm text-slate-300 leading-tight">
            {/* Seja bem vindo(a) <span className="text-blue-400 uppercase font-bold">{user?.name?.split(' ').slice(0,3).join(' ')}</span> 👋 */}
            Seja bem vindo(a) <span className="text-blue-400 uppercase font-bold">{user?.name?.split(' ')[0]}</span> 👋
          </h1> 
        </div>
        <div className="flex items-center gap-3">
          {user?.role === 'admin' && (
            <Link
              to="/admin"
              className="px-3 py-1.5 text-xs font-semibold text-blue-400 bg-brand-50 rounded-lg hover:bg-brand-100 transition"
            >
              Admin
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium bg-red-500 hover:bg-red-600 rounded-xl transition"
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}