import { Component, OnInit } from '@angular/core';
import { Vehicle, KeyValuePair } from './../../models/vehicle';
import { VehicleService } from './../../services/vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[];
  makes: KeyValuePair[];
  query: any = {};

  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.vehicleService.getMakes()
      .subscribe(makes => this.makes = makes);

    this.populateVehicles();
  }

  private populateVehicles() {
    this.vehicleService.getVehicles(this.query)
      .subscribe(result => this.vehicles = result);
  }

  onFilterChange() {
    this.populateVehicles();
    // var vehicles = this.allVehicles;

    // if (this.query.makeId) {
    //   vehicles = vehicles.filter(v => v.make.id == this.query.makeId);
    // }

    // if (this.query.modelId) {
    //   vehicles = vehicles.filter(v => v.model.id == this.query.modelId);
    // }
    
    // this.vehicles = vehicles;
  }

  resetFilter() {
    console.log('filter reset...');
    this.query = {};
    this.onFilterChange();
  }

  sortBy(columnName) {
    if (this.query.sortBy == columnName) {
      this.query.isSortAscending = false
    } else {
      this.query.sortBy = columnName;
      this.query.isSortAscending = true;
    }

    this.populateVehicles();
  }


}
