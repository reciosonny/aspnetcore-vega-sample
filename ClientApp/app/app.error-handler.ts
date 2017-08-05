import { ErrorHandler, Inject } from "@angular/core";
import { ToastyService } from "ng2-toasty";

export class AppErrorHandler implements ErrorHandler {

    //note: inject this in app.module.ts in providers[]:         
    //{ provide: ErrorHandler, useClass: AppErrorHandler },
    constructor(@Inject(ToastyService) private toastyService: ToastyService) {
        
    }

    handleError(error: any): void {
        console.log("ERROR");
        this.toastyService.error({
          title: "Error",
          msg: "An unexpected error happened.",
          theme: "bootstrap",
          showClose: true,
          timeout: 5000
        });
    }
    
}