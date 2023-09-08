import { Component, OnInit } from '@angular/core'
import { ApiService } from 'src/app/services/api.service'

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
  constructor(private api: ApiService) { }
  async ngOnInit(): Promise<void> {
    if (this.api.location) {
      this.center = JSON.parse(this.api.location)
    } else {
      this.position = await this.api.getCurrentLocation()
      this.center = {
        lat: this.position.lat,
        lng: this.position.lng,
      }
    }
  }
  display: any
  zoom = 15
  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = event.latLng.toJSON()
  }
  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON()
  }
}
