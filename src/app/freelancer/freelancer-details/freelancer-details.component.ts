import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/model/user.model';
import { FreelancerService } from 'src/app/shared/service/freelancer.service';

@Component({
  selector: 'app-freelancer-details',
  templateUrl: './freelancer-details.component.html',
  styleUrls: ['./freelancer-details.component.scss']
})
export class FreelancerDetailsComponent implements OnInit{
  freelancer$!: Observable<User>;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  freelancerId: string = '';

  constructor(
    private freelancerService:FreelancerService,
    private route: ActivatedRoute,
  ) { } 

  ngOnInit() {
    this.initialize();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  initialize() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.freelancerId = params.get('id') || '';
      if (!!this.freelancerId) {
        this.getFreelancerDetail(this.freelancerId);
      }
    });
    this.freelancer$.subscribe();
  }

  getFreelancerDetail(freelancerId:string) {
    this.freelancer$ = this.freelancerService.getFreelancerById(freelancerId)
    .pipe(takeUntil(this.destroy$.asObservable()))
  }

  isNumber(val: any): boolean { return typeof val === 'number'; }
}
