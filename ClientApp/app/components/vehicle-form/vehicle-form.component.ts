import { Component, OnInit } from '@angular/core';
// import { MakeService } from "../../services/make.service";
// import { FeatureService } from "../../services/feature.service";
import { VehicleService } from "../../services/vehicle.service";

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {

  makes:any[];
  models:any[];
  features:any[];
  vehicle:any = {};
  
  // constructor(private makeService: MakeService, private featureService: FeatureService) { }
  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.vehicleService.getMakes().subscribe(makes => {
      this.makes = makes;
      console.log(this.makes);
    });
    this.vehicleService.getFeatures().subscribe(features => 
      this.features = features);
  }
    
  onMakeChange() {
    var selectedMake = this.makes.find(m => m.id == this.vehicle.make);
    this.models = selectedMake ? selectedMake.models : [];
    console.log(this.models);
  }
  
}
