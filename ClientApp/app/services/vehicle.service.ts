import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class VehicleService {

  private readonly vehiclesEndpoint = '/api/vehicles'
  constructor(private http: Http) { }

  getFeatures() {
    return this.http.get('/api/features')
      .map(res => res.json());
  }

  getMakes() {
    return this.http.get('/api/makes')
      .map(res => res.json());
  }

  create(vehicle) {
    return this.http
      .post('/api/vehicles', vehicle)
      .map(res => res.json());
      
  }

  delete(id) {
    return this.http.delete('/api/vehicles/'+id)      
      .map(res => res.json());
  }

  update(vehicle) {
    return this.http.put('/api/vehicles/'+vehicle.id, vehicle)
        .map(res => res.json());
  }

  getVehicle(id) {
    return this.http.get('/api/vehicles/'+id)
      .map(res => res.json());
  }

  //We can write this logic inside getVehicles, but that would violate the Single Responsibility Principle (SRP)
  toQueryString(obj) {
    var parts = [];

    for (var property in obj) {
      var value = obj[property];
      if (value != null && value != undefined) {
        parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value)); //encode property and value
      }
    }

    return parts.join('&');
  }

  getVehicles(filter) {
    return this.http.get(this.vehiclesEndpoint+'?'+this.toQueryString(filter))
      .map(res => res.json());
  }

}
