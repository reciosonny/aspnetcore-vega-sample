import * as Raven from 'raven-js';

import { FormsModule } from '@angular/forms'; 
import { NgModule, ErrorHandler } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastyModule } from "ng2-toasty";
import { UniversalModule } from 'angular2-universal';


import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { VehicleFormComponent } from './Components/vehicle-form/vehicle-form.component';

import { MakeService } from "./services/make.service";
import { FeatureService } from "./services/feature.service";
import { VehicleService } from "./services/vehicle.service";
import { AppErrorHandler } from "./app.error-handler";

Raven
  .config('https://ecff8b6e150f451e980553fe3a60f7c6@sentry.io/200013')
  .install();

  
@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        VehicleFormComponent
    ],
    imports: [
        FormsModule,
        ToastyModule.forRoot(),
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'vehicles/new', component: VehicleFormComponent },
            { path: 'vehicles/:id', component: VehicleFormComponent },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [
        { provide: ErrorHandler, useClass: AppErrorHandler },
        VehicleService
    ]

})
export class AppModule {
}
