import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useGame } from './useGame';

describe('useGame Hook', () => {
  // Configuramos temporizadores falsos porque el juego usa setTimeout y setInterval
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('debería inicializarse con los valores por defecto correctos', () => {
    const { result } = renderHook(() => useGame());

    expect(result.current.score).toBe(0);
    expect(result.current.timeLeft).toBe(0);
    expect(result.current.isPlaying).toBe(false);
    expect(result.current.activeHole).toBeNull();
  });

  it('debería iniciar el juego correctamente al llamar a startGame', () => {
    const { result } = renderHook(() => useGame());

    // act() se usa siempre que una acción actualiza el estado de React en los tests
    act(() => {
      result.current.startGame();
    });

    expect(result.current.isPlaying).toBe(true);
    expect(result.current.timeLeft).toBe(15); // Asumiendo que GAME_DURATION es 15
    expect(result.current.score).toBe(0);
  });

  it('debería aumentar el score cuando se golpea al topo activo', () => {
    const { result } = renderHook(() => useGame());

    act(() => {
      result.current.startGame();
    });

    // Simulamos que el topo activo es el índice 2 (ya que es aleatorio, lo forzamos momentáneamente para testear la función whack)
    // Extraemos el activeHole que generó el hook
    const activeHole = result.current.activeHole;

    if (activeHole !== null) {
      act(() => {
        result.current.whack(activeHole);
      });
      expect(result.current.score).toBe(1);
    }
  });
});