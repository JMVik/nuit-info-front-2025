import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-goofy-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './goofy-quiz.component.html',
  styleUrls: ['./goofy-quiz.component.css']
})
export class GoofyQuizComponent {
  @Input() idQuiz!: number;
  @Input() question = '';
  @Input() answers: Record<string, string> = {};
  @Input() validAnswer = ''; 
  @Output() quizAnswer = new EventEmitter<boolean>();

  selectedColor = '#ff0000';
  generatedLetter = '';
  errorMessage = '';

  // Banque de phrases humiliantes
  private humiliatingMessages = [
    'Ouh là, c’est pas ton jour… 😅',
    'Allez, tu peux mieux faire ! 😬',
    'Mauvaise réponse, retourne réviser ! 📚',
    'Euh… non. Essaie encore ! 🤦',
    'Ça pique ! Mais tu vas t’en remettre. 💀'
  ];

  onColorChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.selectedColor = input.value;
    this.generatedLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  }

  validateAnswer() {
    if (!this.generatedLetter) {
      this.errorMessage = 'Choisis d’abord une couleur !';
      return;
    }

    const isCorrect = this.generatedLetter === this.validAnswer.toUpperCase();
    if (!isCorrect) {
      const randomIndex = Math.floor(Math.random() * this.humiliatingMessages.length);
      this.errorMessage = this.humiliatingMessages[randomIndex];
    } else {
      this.errorMessage = '✅ Correct !';
    }

    this.quizAnswer.emit(isCorrect);
  }
}
