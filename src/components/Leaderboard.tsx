import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface Score {
  id: number;
  name: string;
  score: number;
}

export const Leaderboard = ({ refreshTrigger }: { refreshTrigger: number }) => {
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      setLoading(true);
      // Hacemos una consulta SQL equivalente a: SELECT * FROM leaderboard ORDER BY score DESC LIMIT 10
      const { data, error } = await supabase
        .from('leaderboard')
        .select('*')
        .order('score', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error obteniendo ranking:', error);
      } else {
        setScores(data || []);
      }
      setLoading(false);
    };

    fetchScores();
  }, [refreshTrigger]); // Se vuelve a ejecutar si refreshTrigger cambia

  if (loading) return <div className="text-center mt-8 text-slate-500 font-bold animate-pulse">Cargando ranking...</div>;

  return (
    <div className="w-full max-w-md mx-auto bg-slate-900/80 backdrop-blur-md border border-slate-800 p-6 rounded-3xl shadow-2xl">
      <h2 className="text-3xl font-black text-slate-100 mb-6 text-center tracking-tight drop-shadow-md">
        🏆 Top 10 Global
      </h2>
      <ul className="space-y-3">
        {scores.map((s, index) => (
          <li key={s.id} className="flex justify-between items-center bg-slate-800/50 border border-slate-700/50 p-4 rounded-xl shadow-sm hover:bg-slate-700/50 transition-colors">
            <span className="font-bold text-slate-300 text-lg flex items-center gap-3">
              <span className="text-emerald-400 text-xl w-6">#{index + 1}</span>
              {s.name}
            </span>
            <span className="font-black text-emerald-400 text-xl drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]">
              {s.score}
            </span>
          </li>
        ))}
        {scores.length === 0 && (
          <li className="text-center text-slate-500 py-6 font-medium">Aún no hay puntajes. ¡Sé el primero!</li>
        )}
      </ul>
    </div>
  );
};