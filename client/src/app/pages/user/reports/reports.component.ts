import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {
  public reportData$:
    | Observable<{
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
          location: string
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
 public search:string=''
 public cat:string='All'
 public page:number=1
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getData()
  }
  getData():void{
    let query:string='?search=' + this.search + '&cat=' + this.cat + '&page=' + this.page
    this.reportData$=this.api.reportData(query)
  }
}
