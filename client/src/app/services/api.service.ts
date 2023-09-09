import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  location:string=''
  constructor(private router: Router, private http: HttpClient) {}
  logout(): void {
    localStorage.removeItem('token')
    this.router.navigate(['/'])
  }
  login(data: {
    username: string
    password: string
  }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(
      environment.ApiUrl + '/login/local',
      data
    )
  }
  signup(form: NgForm): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(
      environment.ApiUrl + '/login/new',
      form.value
    )
  }
  getName(): Observable<{ name: string }> {
    return this.http.get<{ name: string }>(environment.ApiUrl + '/user/name')
  }
  addReport(form: FormData): Observable<void> {
    return this.http.post<void>(environment.ApiUrl + '/user/add', form)
  }
  reportData(query: string): Observable<{
    error: boolean
    total: number
    page: number
    limit: number
    reports: [
      {
          petName: string;
          category: string
          color: string
          description: string
          contactName: string
          contactEmail: string
          contactPhone: number
          location:{lat:number,lng:number}
          dateLost: string
          isFound: boolean
          foundDate: string
          image: string
      }
    ]
    pageno: [number]
    genreOptions: [string]
  }> {
    return this.http.get<{
      error: boolean
      total: number
      page: number
      limit: number
      reports: [
        {
          petName: string;
          category: string
          color: string
          description: string
          contactName: string
          contactEmail: string
          contactPhone: number
          location:{lat:number,lng:number}
          dateLost: string
          isFound: boolean
          foundDate: string
          image: string
        }
      ]
      pageno: [number]
      genreOptions: [string]
    }>(environment.ApiUrl + '/user/reports' + query)
  }
  getReports(): Observable<[{          petName: string;
          category: string
          color: string
          description: string
          contactName: string
          contactEmail: string
          contactPhone: number
          location:{lat:number,lng:number}
          dateLost: string
          isFound: boolean
          foundDate: string
          image: string
      }]> {
    return this.http.get<[{
          petName: string;
          category: string
          color: string
          description: string
          contactName: string
          contactEmail: string
          contactPhone: number
          location:{lat:number,lng:number}
          dateLost: string
          isFound: boolean
          foundDate: string
          image: string
      }]>(environment.ApiUrl+'/user/nearby')
      }
  getCurrentLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            if (position) {
              let lat = position.coords.latitude
              let lng = position.coords.longitude

              const location = {
                lat,
                lng,
              }
              resolve(location)
            }
          },
          (error) => console.log(error)
        )
      } else {
        reject('Geolocation is not supported by this browser.')
      }
    })
  }
}
