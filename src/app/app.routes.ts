import { Routes, RouterModule }  from '@angular/router';
import { UserDetailsComponent}from './components/user-details/user-details.component';
import { LoginComponent}from './components/authentication/login.component';
import { HomeComponent } from './components/home/home.component';
import { AddAnomalyComponent } from './components/anomaly/add-anomaly.component';
import { Component404 } from './components/404/404.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './services/auth.guard';

// Route config let's you map routes to components
const routes: Routes = [

  {
    path: 'profile',
    component: UserDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'anomaly',
    component: AddAnomalyComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '404',
    component: Component404,
    canActivate: [AuthGuard],
  },
  // map '/' to '/home' as our default route
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**', 
    redirectTo: '/404',
  },
];

export const routing = RouterModule.forRoot(routes);
