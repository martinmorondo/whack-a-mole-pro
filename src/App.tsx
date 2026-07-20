import { useState } from 'react';
import { useGame } from './hooks/useGame';
import { Hole } from './components/Hole';
import { Leaderboard } from './components/Leaderboard';
import { supabase } from './lib/supabase';
import './styles/global.css';

function App() {
  const { score, timeLeft, activeHole, isPlaying, startGame, stopGame, whack } = useGame();
  
  const [playerName, setPlayerName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [refreshBoard, setRefreshBoard] = useState(0);

  const holes = Array.from({ length: 6 }, (_, i) => i);

  const isGameOver = !isPlaying && timeLeft === 0 && score > 0 && !isSaved;

  const handleStartGame = () => {
    setIsSaved(false);
    setPlayerName('');
    startGame();
  };

  const handleSaveScore = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim()) return;

    setIsSaving(true);
    
    const { error } = await supabase
      .from('leaderboard')
      .insert([{ name: playerName.trim(), score }]);

    setIsSaving(false);

    if (error) {
      alert('Hubo un error al guardar tu puntaje.');
      console.error(error);
    } else {
      setIsSaved(true);
      setRefreshBoard(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 to-slate-950 flex flex-col items-center pt-10 pb-20 font-sans px-4 overflow-auto">
      
      {/* Título Estilo Arcade */}
      <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight drop-shadow-lg text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
        Whack a Mole 
        <span className="inline-block bg-emerald-500 text-slate-950 px-4 py-1 ml-4 rounded-2xl text-4xl md:text-6xl align-middle shadow-[0_0_20px_rgba(16,185,129,0.4)]">
          {score}
        </span>
      </h1>
      
      {/* Controles y Display */}
      <div className="flex flex-wrap justify-center items-center gap-6 mb-10 w-full">
        {!isPlaying ? (
          <button 
            className="bg-emerald-500 text-slate-950 px-10 py-4 rounded-full text-2xl font-bold hover:bg-emerald-400 hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] border-2 border-emerald-400"
            onClick={handleStartGame}
          >
            Start 💥
          </button>
        ) : (
          <button 
            className="bg-rose-500 text-white px-10 py-4 rounded-full text-2xl font-bold hover:bg-rose-600 hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(244,63,94,0.3)] border-2 border-rose-400"
            onClick={stopGame}
          >
            Reset
          </button>
        )}
        
        {/* Timer Neón */}
        <div className="bg-slate-900 border border-slate-700 px-8 py-3 rounded-2xl text-4xl font-black text-emerald-400 shadow-inner min-w-[120px] text-center tracking-widest">
          {timeLeft.toString().padStart(2, '0')}s
        </div>
      </div>

      {/* Tablero de Juego (El Contenedor) */}
      <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-[2.5rem] p-6 md:p-12 shadow-2xl w-full max-w-4xl mb-12">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12 md:gap-x-12 md:gap-y-16 w-full">
          {holes.map((index) => (
            <Hole 
              key={index} 
              isActive={activeHole === index} 
              onWhack={() => whack(index)} 
            />
          ))}
        </div>
      </div>

      {/* Formulario Dark Mode */}
      {isGameOver && (
        <form 
          onSubmit={handleSaveScore} 
          className="bg-slate-800 border border-slate-700 p-8 rounded-3xl shadow-2xl max-w-sm w-full flex flex-col items-center animate-in zoom-in duration-300"
        >
          <h3 className="text-2xl font-black text-slate-100 mb-2">¡Tiempo agotado!</h3>
          <p className="text-slate-400 font-medium mb-6">Lograste <strong className="text-emerald-400 text-xl">{score}</strong> puntos</p>
          
          <input
            type="text"
            placeholder="Ingresa tu nombre"
            required
            maxLength={15}
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="w-full bg-slate-900 border-2 border-slate-700 rounded-xl px-4 py-3 mb-4 text-center text-lg font-bold text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
          
          <button
            type="submit"
            disabled={isSaving || !playerName.trim()}
            className="w-full bg-emerald-500 text-slate-950 font-bold py-3 px-6 rounded-xl hover:bg-emerald-400 disabled:opacity-50 disabled:hover:bg-emerald-500 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]"
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