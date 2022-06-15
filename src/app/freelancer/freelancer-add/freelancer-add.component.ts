import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { User } from 'src/app/model/user.model';
import { FreelancerService } from 'src/app/shared/service/freelancer.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-freelancer-add',
  templateUrl: './freelancer-add.component.html',
  styleUrls: ['./freelancer-add.component.scss']
})
export class FreelancerAddComponent implements OnInit{
  freelancer$!: Observable<User>;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  freelancerId: string = '';
  freelanceForm!: FormGroup;

  isUpdate: boolean = false;
  constructor(
    private freelancerService:FreelancerService,
    private route: ActivatedRoute,
    private fb: FormBuilder
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
        this.isUpdate = true;
      }
    });
    this.initializeForm();
  }

  initializeForm(){
    this.freelanceForm = this.fb.group({
      username: ['', Validators.required],
      email: [''],
      phoneNumber: [''],
      skillsets: this.fb.array([]),
      hobby: this.fb.array([])
    });
  }

  updateForm(user:User){
    this.freelanceForm.patchValue({
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber
    });

    user.skillsets.forEach(skill=>{
      let skillset = this.freelanceForm.controls['skillsets'] as FormArray;
      const formCtrl = new FormControl(skill);
      skillset.push(formCtrl);
    });

    user.hobby.forEach(hobby=>{
      let hobbyset = this.freelanceForm.controls['hobby'] as FormArray;
      const formCtrl = new FormControl(hobby);
      hobbyset.push(formCtrl);
    });
    
  }

  save(){
    this.freelancerService.saveFreelancer(this.freelanceForm.getRawValue()).pipe(take(1)).subscribe();
  }

  update(){
    this.freelancerService.updateFreelancerById(this.freelancerId, this.freelanceForm.getRawValue()).pipe(take(1)).subscribe();
  }

  getFreelancerDetail(freelancerId:string) {
    this.freelancer$ = this.freelancerService.getFreelancerById(freelancerId)
    .pipe(takeUntil(this.destroy$.asObservable()));
    this.freelancer$.subscribe(data=>{
      this.updateForm(data);
    });
  }

  addItem(attr:string) {
    (this.freelanceForm.controls[attr] as FormArray).push(new FormControl(''));
  }

  removeItem(attr:string, idx: number): void {
    ((this.freelanceForm.controls[attr] as FormArray)).removeAt(idx);
  }

  get skillsets() {
    return this.freelanceForm.controls['skillsets'] as FormArray;
  }

  get hobbies() {
    return this.freelanceForm.controls['hobby'] as FormArray;
  }

  isNumber(val: any): boolean { return typeof val === 'number'; }

}
