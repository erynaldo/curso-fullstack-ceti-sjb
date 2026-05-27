export default function StatsCard({ label, value, sub, color = 'brand' }) {
  const colors = {
    azul: 'bg-blue-600 text-slate-200 border-slate-100 border-3',
    green: 'bg-green-50 text-green-700 border-green-500 border-3',
    amber: 'bg-amber-50 text-amber-700 border-amber-500 border-3',
    blue:  'bg-blue-50 text-blue-700 border-blue-500 border-3',
  };
  return (
    <div className={`rounded-2xl border p-5 ${colors[color]}`}>
      <p className="text-sm font-bold uppercase mb-2">{label}</p>
      <p className="text-3xl font-display font-bold">{value}</p>
      {sub && <p className="text-sm mt-2 opacity-90">{sub}</p>}
    </div>
  );
}