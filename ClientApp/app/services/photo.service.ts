import { Injectable } from '@angular/core';
import { Http } from "@angular/http";

@Injectable()
export class PhotoService {

    constructor(private http: Http) { }

    upload(vehicleId, photo) {
        var formData = new FormData(); //native javascript objects
        formData.append('file', photo);

        return this.http
                .post(`/api/vehicles/${vehicleId}/photos`, formData)
                .map(res => res.json()); //'/api/vehicles/'+vehicleId+'/photos'
    }
}