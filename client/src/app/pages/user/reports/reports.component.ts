import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { ApiService } from 'src/app/services/api.service'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent {
  apiUrl: string = environment.ApiUrl + '/user/image/'
  public reportData$:
    | Observable<{
      error: boolean
      total: number
      page: number
      limit: number
      reports: [
        {
          petName: string
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
    }>
    | undefined
  public search: string = ''
  public cat: string = 'All'
  public page: number = 1
  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getData()
  }
  getData(): void {
    let query: string =
      '?search=' + this.search + '&cat=' + this.cat + '&page=' + this.page
    this.reportData$ = this.api.reportData(query)
  }
  navigate(location: {lat:number,lng:number}): void {
    this.api.location=JSON.stringify(location)
    this.router.navigate(['/user/dashboard'])
  }
}
