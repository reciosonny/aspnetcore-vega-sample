import { Component, OnInit } from '@angular/core';
// import { MakeService } from "../../services/make.service";
// import { FeatureService } from "../../services/feature.service";
import { VehicleService } from "../../services/vehicle.service";
import { ToastyService } from "ng2-toasty";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";
import "rxjs/add/Observable/forkJoin";

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
  constructor(
    private route: ActivatedRoute, //to read route parameters
    private router: Router, //to redirect users to another page
    private vehicleService: VehicleService,
    private toastyService: ToastyService
  ) { 
    route.params.subscribe(p => {
      this.vehicle.id = +p['id'];
    });

  }

  ngOnInit() {

    var sources = [
      this.vehicleService.getMakes(),
      this.vehicleService.getFeatures()
    ];
    console.log('vehicle #: ',this.vehicle.id);
    if (this.vehicle.id) {
      sources.push(this.vehicleService.getVehicle(this.vehicle.id));
    }

    Observable.forkJoin(sources).subscribe(data => {
      console.log('done loading all services');

      this.makes = data[0];
      this.features = data[1];
      if (this.vehicle.id) {
        this.vehicle = data[2];
      }
    }, err => {
      console.log('error observables...');
      if (err.status == 404) {
        this.router.navigate(['/home']); //redirects to homepage if vehicle doesn't exists
      }
    });

    /* This was commented out in favor of observables/promises */
    // this.vehicleService
    //   .getVehicle(this.vehicle.id)
    //   .subscribe(v => {
    //     this.vehicle = v;
    //   }, err => {
    //     if (err.status == 404) {
    //       this.router.navigate(['/home']); //redirects to homepage if vehicle doesn't exists
    //     }
    //   });

    // this.vehicleService.getMakes().subscribe(makes => {
    //   this.makes = makes;
    //   console.log(this.makes);
    // });
    
    // this.vehicleService.getFeatures().subscribe(features => 
    //   this.features = features);
    /**END**/

  }
  
  private setVehicle(v) {
    this.vehicle.id = v.id;
    this.vehicle.makeId = v.make.id;
    this.vehicle.modelId = v.model.id;
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
      .subscribe(x => console.log(x));
  }
  
}
