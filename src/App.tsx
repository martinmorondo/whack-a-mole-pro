import { useGame } from './hooks/useGame';
import { Hole } from './components/Hole';
import './styles/global.css';

function App() {
  const { score, timeLeft, activeHole, isPlaying, startGame, stopGame, whack } = useGame();
  const holes = Array.from({ length: 6 }, (_, i) => i);

  return (
    <div className="min-h-screen flex flex-col items-center pt-10 font-sans">
      
      {/* Título y Score */}
      <h1 className="text-5xl md:text-7xl font-extrabold text-slate-800 mb-8 tracking-tight drop-shadow-sm">
        Whack a Mole 
        <span className="inline-block bg-emerald-500 text-white px-4 py-1 ml-4 rounded-2xl text-4xl md:text-6xl align-middle shadow-inner">
          {score}
        </span>
      </h1>
      
      {/* Controles y Temporizador */}
      <div className="flex flex-wrap justify-center items-center gap-6 mb-12 w-full px-4">
        {!isPlaying ? (
          <button 
            className="bg-slate-900 text-white px-10 py-4 rounded-full text-2xl font-bold hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all shadow-lg"
            onClick={startGame}
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

      {/* Grilla del Juego: 2 columnas en móvil, 3 en escritorio */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 w-full max-w-3xl px-6">
        {holes.map((index) => (
          <Hole 
            key={index} 
            isActive={activeHole === index} 
            onWhack={() => whack(index)} 
          />
        ))}
      </div>

    </div>
  );
}

export default App;