import * as _ from 'underscore';
import { Component, OnInit } from '@angular/core';
// import { MakeService } from "../../services/make.service";
// import { FeatureService } from "../../services/feature.service";
import { VehicleService } from "../../services/vehicle.service";
import { ToastyService } from "ng2-toasty";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";
import "rxjs/add/Observable/forkJoin";
import { SaveVehicle, Vehicle } from "../../models/vehicle";

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {

  makes:any[];
  models:any[];
  features:any[];
  vehicle:SaveVehicle = {
    id:0,
    makeId:0,
    modelId:0,
    isRegistered:false,
    features: [],
    contact: {
      name:'',
      email:'',
      phone:''
    }
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
        this.setVehicle(data[2]);
        // this.vehicle = data[2];
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
  
  private setVehicle(v: Vehicle) {
    this.vehicle.id = v.id;
    this.vehicle.makeId = v.make.id;
    this.vehicle.modelId = v.model.id;
    this.vehicle.isRegistered = v.isRegistered;

    this.vehicle.contact = v.contact;
    this.vehicle.features = _.pluck(v.features, 'id');
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
