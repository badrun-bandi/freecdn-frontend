import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FreelancerService } from '../shared/service/freelancer.service';
import { SharedModule } from '../shared/shared.module';
import { FreelancerAddComponent } from './freelancer-add/freelancer-add.component';
import { FreelancerDetailsComponent } from './freelancer-details/freelancer-details.component';
import { FreelancerListComponent } from './freelancer-list/freelancer-list.component';
import { FreelancerRoutingModule } from './freelancer-routing.module';
import { FreelancerSearchBarComponent } from './freelancer-search-bar/freelancer-search-bar.component';

@NgModule({
  declarations: [
    FreelancerListComponent,
    FreelancerSearchBarComponent,
    FreelancerDetailsComponent,
    FreelancerAddComponent
  ],
  imports: [
    CommonModule,
    FreelancerRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    FreelancerService, 
  ]
})
export class FreelancerModule { }
