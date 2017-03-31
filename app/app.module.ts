import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routes';
import {AddAnomalyComponent} from './anomaly/add-anomaly.component';
import {AnomalyService} from './anomaly/anomaly.service';
import { AppComponent } from './app.component';
import { FarmsComponent } from './farm/farms.component';
import { UserDetailsComponent } from './user/user-details.component';
import { ChangePswdComponent } from './user/chngpswd.component';
import { LoginComponent } from './authentication/login.component';
import { AlertsComponent } from './alert/alerts.component';
import { RiskRateComponent } from './crop-production/riskrate.component';
import { CropComponent } from './crop-production/crop.component';
import {PlotsComponent} from './plot/plot.component';
import {PlotService} from './plot/plot.service';
import {DiseaseService}  from './disease/disease.service';
import { FarmService } from './farm/farm.service';
import { UserService } from './user/user.service';
import { AuthService } from './authentication/auth.service';
import { AuthGuard } from './authentication/auth.guard';
import { AlertService } from './alert/alert.service';
import { CropService } from './crop-production/crop.service';
import { ChartsModule } from 'ng2-charts';
import { AgmCoreModule } from 'angular2-google-maps/core';


@NgModule({
  declarations: [
    AppComponent,
    FarmsComponent,
    UserDetailsComponent,
    LoginComponent,
    AlertsComponent,
    ChangePswdComponent,
    RiskRateComponent,
    CropComponent,
    PlotsComponent,

    AddAnomalyComponent,
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
    AuthGuard,
    PlotService,
    AnomalyService,
    DiseaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
