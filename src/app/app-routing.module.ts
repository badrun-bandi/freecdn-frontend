import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: '/freelancer', pathMatch: 'full' },
  {
    path: 'freelancer',
    loadChildren: () => import('./freelancer/freelancer.module').then(x => x.FreelancerModule)
  },
  { path: '**', redirectTo: '/freelancer', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
