import { useState } from 'react';
import { useGame } from './hooks/useGame';
import { Hole } from './components/Hole';
import { Leaderboard } from './components/Leaderboard';
import { supabase } from './lib/supabase';
import './styles/global.css';

function App() {
  const { score, timeLeft, activeHole, isPlaying, startGame, stopGame, whack } = useGame();
  
  // Nuevos estados para manejar el guardado del puntaje
  const [playerName, setPlayerName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [refreshBoard, setRefreshBoard] = useState(0);

  const holes = Array.from({ length: 6 }, (_, i) => i);

  // ¿El juego terminó con puntos y aún no se ha guardado?
  const isGameOver = !isPlaying && timeLeft === 0 && score > 0 && !isSaved;

  const handleStartGame = () => {
    setIsSaved(false); // Reseteamos el estado de guardado para la nueva partida
    setPlayerName('');
    startGame();
  };

  const handleSaveScore = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim()) return;

    setIsSaving(true);
    
    // Insertamos el registro en la base de datos
    const { error } = await supabase
      .from('leaderboard')
      .insert([{ name: playerName.trim(), score }]);

    setIsSaving(false);

    if (error) {
      alert('Hubo un error al guardar tu puntaje.');
      console.error(error);
    } else {
      setIsSaved(true);
      setRefreshBoard(prev => prev + 1); // Disparamos la actualización del Top 10
    }
  };

  return (
    <div className="min-h-screen bg-sky-50 flex flex-col items-center pt-10 pb-20 font-sans px-4 overflow-auto">
      
      <h1 className="text-5xl md:text-7xl font-extrabold text-slate-800 mb-8 tracking-tight drop-shadow-sm text-center">
        Whack a Mole 
        <span className="inline-block bg-emerald-500 text-white px-4 py-1 ml-4 rounded-2xl text-4xl md:text-6xl align-middle shadow-inner">
          {score}
        </span>
      </h1>
      
      <div className="flex flex-wrap justify-center items-center gap-6 mb-12 w-full">
        {!isPlaying ? (
          <button 
            className="bg-slate-900 text-white px-10 py-4 rounded-full text-2xl font-bold hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all shadow-lg"
            onClick={handleStartGame}
          >
            Start 💥
          </button>
        ) : (
          <button 
            className="bg-red-500 text-white px-10 py-4 rounded-full text-2xl font-bold hover:bg-red-600 hover:scale-105 active:scale-95 transition-all shadow-lg"
            onClick={stopGame}
          >
            Reset
          </button>
        )}
        
        <div className="bg-slate-200/80 px-8 py-3 rounded-2xl text-4xl font-black text-slate-700 shadow-inner min-w-[120px] text-center">
          {timeLeft.toString().padStart(2, '0')}s
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 w-full max-w-3xl mb-12">
        {holes.map((index) => (
          <Hole 
            key={index} 
            isActive={activeHole === index} 
            onWhack={() => whack(index)} 
          />
        ))}
      </div>

      {/* Formulario de fin de juego */}
      {isGameOver && (
        <form 
          onSubmit={handleSaveScore} 
          className="bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full flex flex-col items-center animate-in zoom-in duration-300"
        >
          <h3 className="text-2xl font-black text-slate-800 mb-2">¡Tiempo agotado!</h3>
          <p className="text-slate-500 font-medium mb-6">Lograste <strong className="text-emerald-500 text-xl">{score}</strong> puntos</p>
          
          <input
            type="text"
            placeholder="Ingresa tu nombre"
            required
            maxLength={15}
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 mb-4 text-center text-lg font-bold text-slate-700 focus:outline-none focus:border-emerald-500 transition-colors"
          />
          
          <button
            type="submit"
            disabled={isSaving || !playerName.trim()}
            className="w-full bg-emerald-500 text-white font-bold py-3 px-6 rounded-xl hover:bg-emerald-600 disabled:opacity-50 transition-all shadow-md"
          >
            {isSaving ? 'Guardando...' : 'Guardar Puntaje'}
          </button>
        </form>
      )}

      {/* Tabla de posiciones */}
      {(!isPlaying && !isGameOver) && (
        <Leaderboard refreshTrigger={refreshBoard} />
      )}
      
    </div>
  );
}

export default App;