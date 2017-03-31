import { Routes, RouterModule }  from '@angular/router';
import { FarmsComponent } from './farm/farms.component';
import { UserDetailsComponent}from './user/user-details.component';
import { ChangePswdComponent}from './user/chngpswd.component';
import { LoginComponent}from './authentication/login.component';
import { AlertsComponent}from './alert/alerts.component';
import { RiskRateComponent}from './crop-production/riskrate.component';
import { CropComponent}from './crop-production/crop.component';
import { AuthGuard } from './authentication/auth.guard';
import {PlotsComponent} from './plot/plot.component';
import {AddAnomalyComponent} from './anomaly/add-anomaly.component';

// Route config let's you map routes to components
const routes: Routes = [

  {
    path: 'farms',
    component: FarmsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: UserDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'alerts',
    component: AlertsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'changepass',
    component: ChangePswdComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'riskrates',
    component: RiskRateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'crop',
    component: CropComponent,
    canActivate: [AuthGuard],
  },
  {
  path: 'plots',
  component: PlotsComponent,
  canActivate: [AuthGuard],
},
{
  path: 'addAnomaly',
  component: AddAnomalyComponent,
  canActivate: [AuthGuard],
},

  // map '/' to '/farms' as our default route
  {
    path: '',
    redirectTo: '/farms',
    pathMatch: 'full'
  },
];

export const routing = RouterModule.forRoot(routes);
