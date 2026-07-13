import { motion } from 'framer-motion';
import moleImg from '../assets/mole.svg';
import dirtImg from '../assets/dirt.svg';

interface HoleProps {
  isActive: boolean;
  onWhack: () => void;
}

export const Hole = ({ isActive, onWhack }: HoleProps) => {
  return (
    /* Contenedor relativo que oculta lo que sale de sus límites (overflow-hidden) */
    <div className="relative w-full aspect-square overflow-hidden flex justify-center items-end">
      
      {/* El Topo Animado */}
      <motion.button
        className="absolute bottom-10 w-3/5 z-10 cursor-pointer disabled:cursor-default focus:outline-none"
        onClick={onWhack}
        disabled={!isActive}
        // Animación: 100% lo empuja hacia abajo (escondido), 0% lo devuelve a su posición original
        initial={{ y: '100%' }}
        animate={{ y: isActive ? '0%' : '100%' }}
        transition={{ 
          type: 'spring', 
          stiffness: 300, // Qué tan "rápido" salta
          damping: 20     // Cuánto "rebota" al frenar
        }}
      >
        <img src={moleImg} alt="Mole" className="w-full h-auto drop-shadow-xl pointer-events-none" />
      </motion.button>
      
      {/* La Tierra */}
      <img 
        src={dirtImg} 
        alt="Dirt" 
        className="absolute bottom-0 w-full z-20 pointer-events-none" 
      />
    </div>
  );
};