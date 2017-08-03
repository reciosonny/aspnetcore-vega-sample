import { Component, OnInit } from '@angular/core';
// import { MakeService } from "../../services/make.service";
// import { FeatureService } from "../../services/feature.service";
import { VehicleService } from "../../services/vehicle.service";
import { ToastyService } from "ng2-toasty";

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {

  makes:any[];
  models:any[];
  features:any[];
  vehicle:any = {
    features: [],
    contact: {}
  };
  
  // constructor(private makeService: MakeService, private featureService: FeatureService) { }
  constructor(private vehicleService: VehicleService,
              private toastyService: ToastyService) { }

  ngOnInit() {
    this.vehicleService.getMakes().subscribe(makes => {
      this.makes = makes;
      console.log(this.makes);
    });
    this.vehicleService.getFeatures().subscribe(features => 
      this.features = features);
  }
    
  onMakeChange() {
    var selectedMake = this.makes.find(m => m.id == this.vehicle.makeId);
    this.models = selectedMake ? selectedMake.models : [];
    console.log(this.models);
    delete this.vehicle.modelId;
  }

  onFeatureToggle(featureId, $event) {

    if ($event.target.checked) {
      this.vehicle.features.push(featureId);
    } else {
      var index = this.vehicle.features.indexOf(featureId); 
      this.vehicle.features.splice(index, 1);
    }

  }

  submit() {
    this.vehicleService.create(this.vehicle)
      .subscribe(
        x => console.log(x),
        err => {
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
