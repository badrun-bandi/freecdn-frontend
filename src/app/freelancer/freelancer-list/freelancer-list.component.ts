import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { interval, Subject } from 'rxjs';
import { debounce, debounceTime, take, takeUntil } from 'rxjs/operators';
import { User } from 'src/app/model/user.model';
import { FreelancerService } from 'src/app/shared/service/freelancer.service';

@Component({
  selector: 'app-freelancer-list',
  templateUrl: './freelancer-list.component.html',
  styleUrls: ['./freelancer-list.component.scss']
})
export class FreelancerListComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();
  dataSource: MatTableDataSource<User> = new MatTableDataSource();
  displayedColumns: string[ ] = ['username', 'email', 'phoneNumber', 'viewDetails', 'update', 'delete'];
  freelancerList: User[] = [];
  isLoading: boolean = false;

  constructor(
    private freelancerService: FreelancerService, 
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.onSearch('');
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSearch(params: any): void {
    this.isLoading = true;
    this.freelancerService.searchFreelancer({username:params})
      .pipe(
        takeUntil(this.destroy$.asObservable())).subscribe((res:User[])=> {
        this.freelancerList = res;
        this.dataSource.data = this.freelancerList;
        this.cdr.detectChanges();
      },
      () => this.isLoading = false);
  }

  sortData(sort: Sort) {
    const data = this.freelancerList.slice();
    let sortedData;
    if (!sort.active || sort.direction === '') {
      sortedData = data;
      return;
    }

    sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return this.compare(a.id, b.id, isAsc);
        case 'username':
          return this.compare(a.username, b.username, isAsc);
        case 'email':
          return this.compare(a.email, b.email, isAsc);
        case 'phoneNumber':
          return this.compare(a.phoneNumber, b.phoneNumber, isAsc);
        default:
          return 0;
      }
    });
    this.dataSource.data = sortedData;
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  delete(id:string){
    this.freelancerService.deleteFreelancerById(id).pipe(take(1)).subscribe();
    this.onSearch('');
  }
}
