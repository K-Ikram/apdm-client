import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routes';
import { ChartsModule } from 'ng2-charts';
import { AgmCoreModule } from 'angular2-google-maps/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { ChangePswdComponent } from './components/chngpswd/chngpswd.component';
import { LoginComponent } from './components/authentication/login.component';
import { AlertsComponent } from './components/alert/alerts.component';
import { RiskRateComponent } from './components/riskrate/riskrate.component';
import { CropComponent } from './components/crop-production/crop.component';
import { AddAnomalyComponent } from './components/anomaly/add-anomaly.component';
import { PlotsComponent } from './components/plot/plot.component';
import { CropitemComponent } from './components/cropitem/cropitem.component';
import { MenuComponent } from './components/menu/menu.component';
import { NotificationComponent } from './components/notification/notification.component';

import { PlotService} from './services/plot.service';
import { DiseaseService}  from './services/disease.service';
import { AnomalyService} from './services/anomaly.service';
import { FarmService } from './services/farm.service';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
import { AlertService } from './services/alert.service';
import { CropService } from './services/crop.service';
import { RiskRateService } from './services/riskrate.service';

@NgModule({
  declarations: [
    AppComponent,
    UserDetailsComponent,
    LoginComponent,
    AlertsComponent,
    ChangePswdComponent,
    RiskRateComponent,
    CropComponent,
    PlotsComponent,
    AddAnomalyComponent,
    HomeComponent,
    CropitemComponent,
    MenuComponent,
    NotificationComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    ChartsModule,
    AgmCoreModule.forRoot({
     apiKey: 'AIzaSyCgD0zF6B8I5ZaVv8kd-OQNRIHtaI2sbAA'
   })
  ],
  providers: [
    FarmService,
    UserService,
    AuthService,
    AlertService,
    CropService,
    RiskRateService,
    AuthGuard,
    PlotService,
    AnomalyService,
    DiseaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
