import { RouterModule, Routes } from '@angular/router';
import { FreelancerAddComponent } from './freelancer-add/freelancer-add.component';
import { FreelancerDetailsComponent } from './freelancer-details/freelancer-details.component';
import { FreelancerListComponent } from './freelancer-list/freelancer-list.component';


const freelancerRoutes: Routes = [
    {
        path: 'create',
        component: FreelancerAddComponent
    }, 
    {
        path: 'update/:id',
        component: FreelancerAddComponent
    },
    {
        path: '',
        component: FreelancerListComponent
    }, 

    {
        path: ':id',
        component: FreelancerDetailsComponent
    }
];

export const FreelancerRoutingModule = RouterModule.forChild(freelancerRoutes);
