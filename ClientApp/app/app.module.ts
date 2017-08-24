
import { Auth } from './services/auth.service';
import { BrowserXhr } from '@angular/http';
import { BrowserXhrWithProgress, ProgressService } from './services/progress.service';
import { ViewVehicleComponent } from './components/view-vehicle/view-vehicle';
import { PaginationComponent } from './components/shared/pagination.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import * as Raven from 'raven-js'; 
import { FormsModule } from '@angular/forms'; 
import { NgModule, ErrorHandler } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastyModule } from 'ng2-toasty';
import { UniversalModule } from 'angular2-universal';

import { AppComponent } from './components/app/app.component'
import { AppErrorHandler } from './app.error-handler';
import { VehicleService } from './services/vehicle.service';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { PhotoService } from "./services/photo.service";
import { AUTH_PROVIDERS } from "angular2-jwt/angular2-jwt";
import { AdminComponent } from "./components/admin/admin.component";

Raven.config('https://d37bba0c459b46e0857e6e2b3aeff09b@sentry.io/155312').install();

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        VehicleFormComponent,
        VehicleListComponent,
        ViewVehicleComponent, 
        PaginationComponent,
        AdminComponent
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        FormsModule,
        ToastyModule.forRoot(),
        RouterModule.forRoot([
            { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
            { path: 'vehicles/new', component: VehicleFormComponent },
            { path: 'vehicles/edit/:id', component: VehicleFormComponent},
            { path: 'vehicles/:id', component: ViewVehicleComponent },
            { path: 'vehicles', component: VehicleListComponent },
            { path: 'admin', component: AdminComponent },
            { path: 'home', component: HomeComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [
      { provide: ErrorHandler, useClass: AppErrorHandler },
      Auth,
      AUTH_PROVIDERS,
      VehicleService,
      PhotoService
    ]
})
export class AppModule {
}
