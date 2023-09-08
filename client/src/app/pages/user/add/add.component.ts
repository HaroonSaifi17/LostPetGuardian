import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { ApiService } from 'src/app/services/api.service'

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  constructor(private api: ApiService) { }
  position: any
  msg: string = ''
  ngOnInit(): void {
    this.myLocation()
  }
  addReport(form: NgForm,l:HTMLInputElement): void {
    l.value=this.getLocation()
    console.log(this.position,l.value)
    if (l.value) {
      this.myLocation()
      this.msg = 'Allow Location'
      return
    }
   l.disabled=false
    this.api.addReport(form).subscribe((d) => {
      this.msg = 'Added Successfully'
      form.reset()
      l.disabled=true
    })
  }
  async myLocation() {
    this.position = await this.api.getCurrentLocation()
  }
  getLocation(): string {
    this.myLocation()
    return JSON.stringify(this.position)
  }
}
