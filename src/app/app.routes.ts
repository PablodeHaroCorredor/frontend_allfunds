// src/app/app.routes.ts
import { Route } from '@angular/router';
import { NewsViewComponent } from './components/news/news-view/news-view.component';
import { ArchivedViewComponent } from './components/news/archived-view/archived-view.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';

export const routes: Route[] = [
  {
    path: 'news',
    component: NewsViewComponent,
    canActivate: [AuthGuard],
    data: { roles: ['user', 'admin'] },
  },
  {
    path: 'archived',
    component: ArchivedViewComponent,
    canActivate: [AuthGuard],
    data: { roles: ['user', 'admin'] },
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];
