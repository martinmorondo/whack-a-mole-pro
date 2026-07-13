import { useState, useEffect, useRef, useCallback } from 'react';

const GAME_DURATION = 15;
const HOLES_COUNT = 6;

export const useGame = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [activeHole, setActiveHole] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const lastHoleRef = useRef<number | null>(null);
  const peepTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const randomTime = (min: number, max: number) => Math.round(Math.random() * (max - min) + min);

  const randomHole = useCallback((): number => {
    const idx = Math.floor(Math.random() * HOLES_COUNT);
    if (idx === lastHoleRef.current) {
      return randomHole();
    }
    lastHoleRef.current = idx;
    return idx;
  }, []);

  const peep = useCallback(() => {
    const time = randomTime(500, 1000); // Tiempos ajustados para mejor UX
    const hole = randomHole();
    
    setActiveHole(hole);

    peepTimeoutRef.current = setTimeout(() => {
      setActiveHole(null);
      if (isPlaying) peep();
    }, time);
  }, [isPlaying, randomHole]);

  useEffect(() => {
    if (isPlaying) {
      peep();
    } else if (peepTimeoutRef.current) {
      clearTimeout(peepTimeoutRef.current);
      setActiveHole(null);
    }
    return () => {
      if (peepTimeoutRef.current) clearTimeout(peepTimeoutRef.current);
    };
  }, [isPlaying, peep]);

  useEffect(() => {
    let timerInterval: ReturnType<typeof setInterval>;
    if (isPlaying && timeLeft > 0) {
      timerInterval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
    }
    return () => clearInterval(timerInterval);
  }, [isPlaying, timeLeft]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setIsPlaying(true);
  };

  const stopGame = () => {
    setIsPlaying(false);
    setTimeLeft(0);
    setScore(0);
  };

  const whack = (holeIndex: number) => {
    if (holeIndex === activeHole) {
      setScore((prev) => prev + 1);
      setActiveHole(null); // Oculta el topo inmediatamente al golpearlo
    }
  };

  return { score, timeLeft, activeHole, isPlaying, startGame, stopGame, whack };
};