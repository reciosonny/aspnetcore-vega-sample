import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { BrowserXhr } from "@angular/http";

@Injectable()
export class ProgressService {

    //subject is derived from observable
    private uploadProgress: Subject<any> = new Subject();

    startTracking() {
        this.uploadProgress = new Subject(); //need to instantiate this so that uploadProgress throws a new instance of observable.
        return this.uploadProgress;
    }

    notify(progress) {
        this.uploadProgress.next(progress);
    }

    endTracking() {
        this.uploadProgress.complete(); //we complete the upload progress to avoid memory leak and subscribing past xhr instances.
    }
}


// XMLHttpRequest
// BrowserXhr
@Injectable()
export class BrowserXhrWithProgress extends BrowserXhr {

    /**
     *
     */
    constructor(private service: ProgressService) {
        super();
    }

    build(): XMLHttpRequest {
        var xhr: XMLHttpRequest = super.build();

        // xhr.onprogress = (event) => {
        //     this.service.downloadProgress.next(this.createProgress(event));
        // }
        // xhr.upload.onprogress = (event) => {
        //     this.service.uploadProgress.next(this.createProgress(event));
        // }

        // xhr.upload.onloadend = () => {
        //     console.log('BEFORE',this.service.uploadProgress);
        //     this.service.uploadProgress.complete();
        //     console.log('AFTER',this.service.uploadProgress);
        // }

        xhr.upload.onprogress = (event) => {
            this.service.notify(this.createProgress(event));
        };
      
        xhr.upload.onloadend = () => {
            this.service.endTracking();
        }
      

        return xhr;
    }

    private createProgress(event) {
        return {
            loaded: event.loaded,
            total: event.total,
            //event.loaded =  is amount of bytes transferred in current state
            //event.total = is total amount of bytes to transfer
            percentage: Math.round(event.loaded / event.total * 100) 
        }
    }

}