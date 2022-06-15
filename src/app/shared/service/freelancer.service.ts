import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductInterface } from 'src/app/model/product.model';
import { User } from 'src/app/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class FreelancerService{
  baseURL = 'http://localhost:8080/freecdn/freelance';

  constructor(
    private httpClient: HttpClient
  ) { }

  searchFreelancer(params?: { username:string }): Observable<User[]> {
    let url = this.baseURL;
    return this.httpClient.get<User[]>(url, {params: params});
  }

  getFreelancerById(id: string):  Observable<User> {
    return this.httpClient.get<User>(this.baseURL+'/'+id);
  }

  saveFreelancer(user: User):  Observable<User> {
    console.log(user);
    const body = { ...user };
    return this.httpClient.put<User>(this.baseURL, body);

  }

  updateFreelancerById(id: string, user: User):  Observable<User> {
    return this.httpClient.put<User>(this.baseURL+'/'+id, user);
  }

  deleteFreelancerById(id: string) {
    return this.httpClient.delete<User>(this.baseURL+'/'+id);
  }

  getCategoryList() : Observable<string[]> {
    return this.httpClient.get<string[]>(this.baseURL+'/categories');
  }

}
