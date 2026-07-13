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
    <div className="w-full max-w-md mx-auto mt-12 bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-xl">
      <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center tracking-tight">🏆 Top 10 Jugadores</h2>
      <ul className="space-y-3">
        {scores.map((s, index) => (
          <li key={s.id} className="flex justify-between items-center bg-slate-100 p-4 rounded-xl shadow-sm">
            <span className="font-bold text-slate-700 text-lg flex items-center gap-3">
              <span className="text-emerald-500 text-xl">#{index + 1}</span>
              {s.name}
            </span>
            <span className="font-black text-slate-900 text-xl">{s.score}</span>
          </li>
        ))}
        {scores.length === 0 && (
          <li className="text-center text-slate-500 py-4">Aún no hay puntajes. ¡Sé el primero!</li>
        )}
      </ul>
    </div>
  );
};