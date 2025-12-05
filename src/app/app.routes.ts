import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'planet',
        loadComponent: () => import('./planete-component/planete-component.component').then(m => m.PlaneteComponent)
    }
];
