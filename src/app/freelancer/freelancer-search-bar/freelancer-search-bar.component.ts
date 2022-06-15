import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { debounceTime, Observable, Subject } from 'rxjs';
import { FreelancerService } from 'src/app/shared/service/freelancer.service';

@Component({
  selector: 'app-freelancer-search-bar',
  templateUrl: './freelancer-search-bar.component.html',
  styleUrls: ['./freelancer-search-bar.component.scss']
})
export class FreelancerSearchBarComponent implements OnInit{

  userName: string = '';
  @Output() changed: EventEmitter<string> = new EventEmitter();
  private debouncer: Subject<string> = new Subject<string>();
  
  constructor(
    private freelancerService: FreelancerService
  ) {
    this.debouncer
    .pipe(debounceTime(1000))
    .subscribe((value) => this.changed.emit(value));
  } 

  ngOnInit() {}

  searchOnChange() {
    this.debouncer.next(this.userName);
  }
}
