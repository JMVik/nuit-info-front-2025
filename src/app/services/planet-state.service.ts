import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanetStateService {

  private readonly STORAGE_KEY = 'planetState';

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

  get state$() {
    return this._state$.asObservable();
  }

  get value(): number {
    return this._state$.value;
  }

  setState(value: number): void {
    const normalized = Math.max(0, Math.floor(value)); // >=0 entier
    this._state$.next(normalized);
    try {
      localStorage.setItem(this.STORAGE_KEY, String(normalized));
    } catch {
    }
  }

  increment(delta: number = 1): void {
    this.setState(this.value + delta);
  }

  reset(): void {
    this.setState(0);
  }
}
