import {AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlanetStateService} from '../../services/planet-state.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-snake',
  imports: [CommonModule],
  templateUrl: './snake.component.html',
  styleUrl: './snake.component.css'
})
export class SnakeComponent implements AfterViewInit, OnDestroy {
  @Input() textToEat: string = "Bienvenue au jeu Snake mange-lettres ! Amusez-vous bien !";
  @Input() displayInModal: boolean = false;

  @ViewChild('headerRef') headerRef!: ElementRef;
  @ViewChild('gameContainerRef') gameContainerRef!: ElementRef;

  readonly CELL_SIZE = 25;
  TICK_INTERVAL_MS = 150;

  GRID_SIZE = 0;
  gridPixelSize: number = 0;

  snake: { x: number, y: number }[] = [];
  letters: { x: number, y: number, value: string }[] = [];

  direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' = 'RIGHT';
  score = 0;
  isGameOver = false;
  gameLoop: any;

  isGameInitialized: boolean = false;

  constructor(private el: ElementRef, private planetStateService: PlanetStateService, private router: Router) {}

  @HostListener('window:resize')
  onResize() {
    this.recalculateAndAdaptGrid();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.isGameOver || !this.isGameInitialized) return;

    switch (event.key) {
      case 'ArrowUp':
        if (this.direction !== 'DOWN') this.direction = 'UP';
        break;
      case 'ArrowDown':
        if (this.direction !== 'UP') this.direction = 'DOWN';
        break;
      case 'ArrowLeft':
        if (this.direction !== 'RIGHT') this.direction = 'LEFT';
        break;
      case 'ArrowRight':
        if (this.direction !== 'LEFT') this.direction = 'RIGHT';
        break;
    }
  }

  ngAfterViewInit(): void {
    this.recalculateAndAdaptGrid();
    this.startGame();
  }

  recalculateAndAdaptGrid() {
    const hostElement = this.el.nativeElement as HTMLElement;

    if (!this.headerRef || !hostElement) return;

    const containerRect = hostElement.getBoundingClientRect();
    const availableWidth = containerRect.width;
    const availableHeight = containerRect.height;

    const headerHeight = this.headerRef.nativeElement.offsetHeight;

    const padding = 20;

    const gridAvailableHeight = availableHeight - headerHeight - padding;

    const gridAvailableWidth = availableWidth - padding;

    const smallestDimension = Math.floor(Math.min(gridAvailableWidth, gridAvailableHeight));

    const newGridSize = Math.max(10, Math.floor(smallestDimension / this.CELL_SIZE)); // Min 10x10

    if (this.GRID_SIZE !== newGridSize) {
      this.GRID_SIZE = newGridSize;
      if (this.isGameInitialized) {
        this.startGame();
      }
    }

    this.gridPixelSize = this.GRID_SIZE * this.CELL_SIZE;

    this.isGameInitialized = true;
  }

  ngOnDestroy(): void {
    this.stopGameLoop();
  }

  startGame() {
    this.stopGameLoop();
    this.score = 0;
    this.isGameOver = false;

    if (this.GRID_SIZE < 10) {
      console.error("Taille de grille trop petite pour démarrer le jeu.");
      return;
    }

    const center = Math.floor(this.GRID_SIZE / 2);
    this.snake = [{ x: center, y: center }, { x: center - 1, y: center }];

    this.direction = 'RIGHT';
    this.initializeLetters();
    this.gameLoop = setInterval(() => this.tick(), this.TICK_INTERVAL_MS);
  }

  stopGameLoop() {
    if (this.gameLoop) {
      clearInterval(this.gameLoop);
    }
  }

  initializeLetters() {
    this.letters = [];
    const textChars = this.textToEat.split('');
    let charIndex = 0;

    const START_X = 0;
    const START_Y = 0;

    for (let y = START_Y; y < this.GRID_SIZE; y++) {
      for (let x = START_X; x < this.GRID_SIZE; x++) {

        if (charIndex < textChars.length) {
          const char = textChars[charIndex];

          if (char === '\n') {
            charIndex++;
            break;
          }

          if (!this.snake.some(s => s.x === x && s.y === y)) this.letters.push({ x, y, value: char });
          charIndex++;

        } else {
          return;
        }
      }
    }
  }

  tick() {
    if (this.isGameOver || this.letters.length === 0) return;

    const head = this.snake[0];
    let newHead = { x: head.x, y: head.y };

    switch (this.direction) {
      case 'UP': newHead.y--; break;
      case 'DOWN': newHead.y++; break;
      case 'LEFT': newHead.x--; break;
      case 'RIGHT': newHead.x++; break;
    }

    if (this.checkCollision(newHead)) {
      this.isGameOver = true;
      this.stopGameLoop();
      return;
    }

    this.snake.unshift(newHead);

    const eatenLetterIndex = this.letters.findIndex(letter => letter.x === newHead.x && letter.y === newHead.y);

    if (eatenLetterIndex !== -1) {
      const eatenChar = this.letters[eatenLetterIndex];

      this.letters.splice(eatenLetterIndex, 1);

      if (eatenChar.value.trim() !== '') {
        this.score++;
      } else {
        this.snake.pop();
      }

      if (this.letters.length === 0) {
        this.stopGameLoop();
        this.planetStateService.increment(1);
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      }

    } else {
      this.snake.pop();
    }
  }

  checkCollision(head: { x: number, y: number }): boolean {
    if (head.x < 0 || head.x >= this.GRID_SIZE || head.y < 0 || head.y >= this.GRID_SIZE) {
      return true;
    }

    for (let i = 1; i < this.snake.length; i++) {
      if (head.x === this.snake[i].x && head.y === this.snake[i].y) {
        return true;
      }
    }
    return false;
  }

  isSnake(x: number, y: number): boolean {
    return this.snake.some(segment => segment.x === x && segment.y === y);
  }

  getLetterAt(x: number, y: number): string | null {
    const letter = this.letters.find(l => l.x === x && l.y === y);
    return letter ? letter.value : null;
  }
}
