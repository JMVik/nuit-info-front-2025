import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanetStateService {

  private readonly STORAGE_KEY = 'planetState';

  // sujet réactif (toutes les pages peuvent s’abonner)
  private readonly _state$ = new BehaviorSubject<number>(this.loadInitialState());

  constructor() {}

  private loadInitialState(): number {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored === null) {
        return 0;
      }
      const n = Number(stored);
      return Number.isFinite(n) ? n : 0;
    } catch {
      return 0;
    }
  }

  // observable pour les composants
  get state$() {
    return this._state$.asObservable();
  }

  // valeur courante
  get value(): number {
    return this._state$.value;
  }

  // écrit une nouvelle valeur
  setState(value: number): void {
    const normalized = Math.max(0, Math.floor(value)); // >=0 entier
    this._state$.next(normalized);
    try {
      localStorage.setItem(this.STORAGE_KEY, String(normalized));
    } catch {
      // rien, au pire ça ne persiste pas
    }
  }

  // incrémente (appelé depuis d’autres pages)
  increment(delta: number = 1): void {
    this.setState(this.value + delta);
  }

  reset(): void {
    this.setState(0);
  }
}
