import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./planete-component/planete-component.component').then(m => m.PlaneteComponent)
  },
  {
    path: 'linux',
    title: 'NuitInfo - Linux',
    loadComponent: () => import('./linux/linux.component').then(c => c.LinuxComponent),
  },
  {
    path: 'tours',
    title: 'NuitInfo - Tours',
    loadComponent: () => import('./tours/tours.component').then(c => c.ToursComponent)
  },
  {
    path: 'quizz',
    title: 'NuitInfo - Quizz',
    loadComponent: () => import('./goofy-quiz-list/goofy-quiz-list.component').then(c => c.GoofyQuizListComponent)
  },
];

