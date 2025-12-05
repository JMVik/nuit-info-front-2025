import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'linux',
    title: 'NuitInfo - Linux',
    loadComponent: () => import('./linux/linux.component').then(c => c.LinuxComponent),
  },
  {
    path: 'snake',
    title: 'NuitInfo - Snake',
    loadComponent: () => import('./linux/snake/snake.component').then(c => c.SnakeComponent)
  },
    {
        path: 'planet',
        loadComponent: () => import('./planete-component/planete-component.component').then(m => m.PlaneteComponent)
    }
];

export const routes: Routes = [
];

