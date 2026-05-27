import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-brand-700 to-slate-900 flex flex-col items-center justify-center px-4">

      {/* Partículas decorativas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-500 opacity-10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 opacity-10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        {/* Badge */}

        {/* Título principal */}
        <h1 className="font-display text-4xl md:text-5xl lg:text-5xl font-bold text-white leading-tight mb-4">
          Formação Aluno
          <span className="block text-brand-100 mt-1">Dev FullStack</span>
        </h1>

        <p className="text-2xl md:text-3xl font-display text-slate-300 mb-3">
          Do Zero ao Deploy
        </p>

        {/* Subtexto */}
        <p className="text-slate-400 text-base md:text-lg mb-10 max-w-lg mx-auto leading-relaxed">
          Você vai aprender HTML, TailwindCSS, React, Node.js, PostgreSQL, Git e GitHub. Tudo isso em projetos práticos.
        </p>

        {/* Botões */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/login"
            className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 hover:border-white/40 transition-all duration-200 shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 text-base"
          >
            Login
          </Link>
          <Link
            to="/cadastro"
            className="px-8 py-3.5 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl border border-white/20 transition-all duration-200 backdrop-blur-sm text-base"
          >
            Cadastre-se
          </Link>
        </div>
        
        {/* Info rápida */}
        <div className="mt-14 grid grid-cols-3 gap-6 max-w-sm mx-auto">
          {[['16h', 'de aulas práticas'], ['100%', 'presencial'], ['Certificado', 'ao final do curso']].map(([v, l]) => (
            <div key={v} className="text-center">
              <div className="text-white font-display font-bold text-xl">{v}</div>
              <div className="text-slate-400 text-xs mt-0.5">{l}</div>
            </div>
          ))}
        </div>
        <span className="inline-block mt-8 px-4 py-1.5 rounded-full border border-brand-500/40 text-slate-400 text-sm font-medium tracking-wide bg-brand-500/10">
          Apoio: <strong className="text-white">CETI São João Batista</strong>
        </span>
      </div>
    </div>
  );
}