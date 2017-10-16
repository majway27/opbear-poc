import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import { Vehicle } from './vehicle';
import { VehicleService } from './vehicle.service';

@Component({
  selector: 'vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: [ './vehicle-detail.component.css' ]
})

export class VehicleDetailComponent implements OnInit {
  vehicle: Vehicle;
  
  constructor(
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
    private location: Location
  ) {}
  
  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.vehicleService.getVehicle(+params.get('id')))
      .subscribe(vehicle => this.vehicle = vehicle);
  }

  goBack(): void {
    this.location.back();
  }
  
}