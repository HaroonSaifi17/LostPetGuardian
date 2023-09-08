import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private router:Router,private http:HttpClient) { }
  logout(): void {
    localStorage.removeItem('token')
    this.router.navigate(['/'])
  }
  login(data:{
    email:string,
    password:string
  }):Observable<{token:string}>{
    return this.http.post<{token:string}>(environment.ApiUrl + '/login/local',data )
  }
}
