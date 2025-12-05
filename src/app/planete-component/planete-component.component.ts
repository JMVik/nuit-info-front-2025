import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlanetStateService } from "../services/planet-state.service";
import { Router } from '@angular/router';

interface ZoneDeclencheur {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  spriteIndex: number; // index dans le tableau des frames
}

interface SpriteFrame {
  id: string;
  x: number;      // position X dans le sprite sheet
  y: number;      // position Y dans le sprite sheet
  width: number;  // largeur de la frame
  height: number; // hauteur de la frame
}

@Component({
  selector: 'planete-component',
  standalone: true,                    // important si tu utilises "imports"
  templateUrl: './planete-component.component.html',
  styleUrls: ['./planete-component.component.css'],
  imports: [CommonModule]
})
export class PlaneteComponent implements OnInit, OnDestroy {

  // Image du sprite sheet (une seule image)
  spriteUrl = '/assets/sprites/planete-sprite__2_.png';

  // Taille *totale* du sprite sheet
  spriteSheetWidth = 500;
  spriteSheetHeight = 500;

  // Frame actuellement affichée (index dans frames[])
  currentSpriteIndex = 0;

  // Tableau des frames dans le sprite sheet
  frames: SpriteFrame[] = [
    { id: 'idle',   x: 0,   y: 0,   width: 250, height: 250 },   // index 0
    { id: 'etat-1', x: 0,   y: 250, width: 250, height: 250 },   // index 1
    { id: 'etat-2', x: 250, y: 0,   width: 250, height: 250 },   // index 2
    { id: 'etat-3', x: 250, y: 250, width: 250, height: 250 },   // index 3
  ];

  // Tableau des zones qui déclenchent un changement d'état (et donc de sprite)
  zonesDeclencheur: ZoneDeclencheur[] = [];

  private stateSub?: Subscription;

  constructor(private planetState: PlanetStateService, private router: Router) {}

  ngOnInit(): void {
    // à l'init, on s'abonne à l'état global pour afficher le bon sprite
    this.stateSub = this.planetState.state$.subscribe(state => {
      // ici : simple mapping = state % frames.length
      this.currentSpriteIndex = state % this.frames.length;

      // si tu veux des seuils :
      // if (state < 10) this.currentSpriteIndex = 0;
      // else if (state < 20) this.currentSpriteIndex = 1;
      // etc.
      switch (state) {
        case 0: this.currentSpriteIndex = 0; break;
        case 1: this.currentSpriteIndex = 1; break;
        case 2: this.currentSpriteIndex = 2; break;
        case 3: this.currentSpriteIndex = 3; break;
        default: this.currentSpriteIndex = 0; break;
      }
    });

  }

  ngOnDestroy(): void {
    this.stateSub?.unsubscribe();
  }

  onButtonClick(id: number) {
    const currentSpiteIndex = this.planetState.value;
    console.log("Index actuel :", currentSpiteIndex);
    switch (currentSpiteIndex) {
      case 0:
        this.router.navigate(['/tours']);
        break;
      case 1:
        this.router.navigate(['/linux']);
        break;
      case 2:
        this.router.navigate(['/quizz']);
        break;
      default:
        this.router.navigate(['/']);
    }
  }

  get currentFrame(): SpriteFrame {
    return this.frames[this.currentSpriteIndex] ?? this.frames[0];
  }

  // position du background pour afficher la bonne frame
  get backgroundPosition(): string {
    const frame = this.currentFrame;
    return `-${frame.x}px -${frame.y}px`;
  }

  // taille du background (taille totale du sprite sheet)
  get backgroundSize(): string {
    return `${this.spriteSheetWidth}px ${this.spriteSheetHeight}px`;
  }

   showPopup = true;   // la pop-up s’affiche au chargement

  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }
}
