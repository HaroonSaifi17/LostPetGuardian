import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { ApiService } from 'src/app/services/api.service'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.css'],
})
export class DasboardComponent implements OnInit {
  position: any
  center: any
  options: any = {
    animation: google.maps.Animation.DROP,
    icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
  }
  apiUrl: string = environment.ApiUrl + '/user/image/'
  public reportData$:
    | Observable<
      [
        {
          petName: string
          category: string
          color: string
          description: string
          contactName: string
          contactEmail: string
          contactPhone: number
          location: { lat: number; lng: number }
          dateLost: string
          isFound: boolean
          foundDate: string
          image: string
        }
      ]
    >
    | undefined
  currentData:
    | {
      petName: string
      category: string
      color: string
      description: string
      contactName: string
      contactEmail: string
      contactPhone: number
      location: { lat: number; lng: number }
      dateLost: string
      isFound: boolean
      foundDate: string
      image: string
    }
    | undefined
  constructor(private api: ApiService) { }
  async ngOnInit(): Promise<void> {
    this.getData()
    if (this.api.location) {
      this.center = JSON.parse(this.api.location)
      this.position = await this.api.getCurrentLocation()
      this.positionCenter = {
        lat: this.position.lat,
        lng: this.position.lng,
      }
      this.zoom=18
    } else {
      this.position = await this.api.getCurrentLocation()
      this.positionCenter = {
        lat: this.position.lat,
        lng: this.position.lng,
      }
      this.center = this.positionCenter
    }
  }
  positionCenter: any
  display: any
  zoom = 15
  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = event.latLng.toJSON()
  }
  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON()
  }
  getData(): void {
    this.reportData$ = this.api.getReports()
  }
}
