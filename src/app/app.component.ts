import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoofyQuizComponent } from './goofy-quiz/goofy-quiz.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, GoofyQuizComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  quizzes = [
    {
      id: 1,
      question: 'Quelle est ta couleur préférée ?',
      answers: { A: 'Rouge', B: 'Bleu', C: 'Vert', D: 'Jaune' },
      validAnswer: 'B'
    },
    {
      id: 2,
      question: 'Ton langage préféré ?',
      answers: { A: 'Java', B: 'C++', C: 'Python', D: 'Dart' },
      validAnswer: 'C'
    }
  ];

  getQuizById(id: number) {
    return this.quizzes.find(q => q.id === id);
  }
}
