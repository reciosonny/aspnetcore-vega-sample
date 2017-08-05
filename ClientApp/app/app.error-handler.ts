import * as Raven from 'raven-js';
import { ErrorHandler, Inject, NgZone, isDevMode } from "@angular/core";
import { ToastyService } from "ng2-toasty";

export class AppErrorHandler implements ErrorHandler {

    //note: inject this in app.module.ts in providers[]:         
    //{ provide: ErrorHandler, useClass: AppErrorHandler },
    //notes on 3rd party apis like toastyService: It won't trigger the first time the error is triggered. We need to use zones to address the problem and detect state change.
    constructor(
        private ngZone: NgZone,
        @Inject(ToastyService) private toastyService: ToastyService) {
        
    }

    handleError(error: any): void {
        console.log('testing...');
        if (!isDevMode()) {
            Raven.captureException(error.originalError || error);
            console.log("error handler running in production mode...");
        }
        else {
            console.log("error handler running in development mode...");
            throw error;
        }
        
        this.ngZone.run(() => {
            this.toastyService.error({
                title: "Error",
                msg: "An unexpected error happened.",
                theme: "bootstrap",
                showClose: true,
                timeout: 5000
            });

        });
    }
    
}