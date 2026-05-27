import { RadialBarChart, RadialBar, ResponsiveContainer, Tooltip } from 'recharts';

export default function ProgressChart({ hoursDone, totalHours = 16 }) {
  const pct = Math.round((hoursDone / totalHours) * 100);
  
  // O truque: adicionamos um segundo objeto na lista com o valor 100 (invisível) 
  // apenas para o gráfico saber qual é o limite máximo da barra.
  const data = [
    { name: 'Total', value: 100, fill: 'transparent' },
    { name: 'Frequência', value: pct, fill: '#3b6fd4' }
  ];

  return (
    <div className="bg-white rounded-2xl border border-blue-500 border-4 p-5 flex flex-col items-center">
      <p className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-2">Sua Frequência</p>
      <div className="relative w-50 h-50 flex items-center justify-center">
        <ResponsiveContainer width="90%">
          <RadialBarChart
            cx="50%" cy="50%" innerRadius="50%" outerRadius="100%"
            barSize={14} data={data} startAngle={90} endAngle={-270}
          >
            {/* O Recharts vai renderizar as barras na ordem do array. 
                Usamos o dataKey="value" e ele vai entender o limite com base no 100. */}
            <RadialBar 
              background={{ fill: '#fff' }} 
              dataKey="value" 
              cornerRadius={2} 
            />
            {/* Filtramos o tooltip para não mostrar a barra invisível de 'Total' */}
            <Tooltip formatter={(v, name, props) => props.payload.name === 'Total' ? null : [`${v}%`, 'Frequência']} />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-2xl font-bold text-brand-700">{pct}%</span>
          <span className="text-sm text-slate-700">frequência</span> 
        </div>
      </div>
      <p className="text-xs font-bold  text-slate-800 mt-2">
        Aulas assistidas: {pct}% ou {hoursDone}hs<br />
        Aulas restantes: {100 - pct}% ou {totalHours - hoursDone}hs
      </p>
    </div>
  );
}