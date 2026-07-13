import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import App from './App';

describe('Test de Integración de App (UI + Lógica)', () => {
  // Igual que antes, controlamos el tiempo artificialmente
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllTimers();
  });

  it('renderiza la aplicación correctamente', () => {
    render(<App />);
    
    // Verificamos que el título y el botón de Start existan
    expect(screen.getByText(/Whack a mole/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Start/i })).toBeInTheDocument();
  });

  it('cambia el estado al iniciar el juego y permite sumar puntos', () => {
    render(<App />);

    // 1. Verificamos el score inicial (debe haber un "0" en pantalla)
    expect(screen.getByText('0')).toBeInTheDocument();

    // 2. Simulamos que el usuario hace clic en el botón Start
    const startButton = screen.getByRole('button', { name: /Start/i });
    act(() => {
      fireEvent.click(startButton);
    });

    // 3. El botón debe haber cambiado a Reset
    expect(screen.getByRole('button', { name: /Reset/i })).toBeInTheDocument();

    // 4. Avanzamos el reloj virtual 1 segundo para forzar que salga el primer topo 
    // (nuestro hook dispara el topo entre 500ms y 1000ms)
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // 5. EL TRUCO SENIOR: Buscamos por accesibilidad. 
    // Como pusimos <img alt="Mole" /> dentro de un <button>, RTL entiende que el botón se llama "Mole".
    const moleButtons = screen.getAllByRole('button', { name: /Mole/i });
    
    // Encontramos el único topo que no está deshabilitado
    const activeMole = moleButtons.find(btn => !(btn as HTMLButtonElement).disabled);

    // Asegurarnos de que el juego realmente activó uno
    expect(activeMole).toBeDefined();

    // 6. ¡Golpeamos al topo!
    if (activeMole) {
      act(() => {
        fireEvent.click(activeMole);
      });
    }

    // 7. El score en la pantalla debería haber subido a 1
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});