import { Component, OnInit } from '@angular/core'
import { ApiService } from 'src/app/services/api.service'

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.css'],
})
export class DasboardComponent implements OnInit {
  position:any
  center:any
  constructor(private api: ApiService) { }
  async ngOnInit(): Promise<void> {
    this.position = await this.api.getCurrentLocation()
    this.center = {
    lat: this.position.lat,
    lng:this.position.lng,
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
