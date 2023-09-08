import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { ApiService } from 'src/app/services/api.service'

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  constructor(private api: ApiService) {}
  position: any
  msg: string = ''
  ngOnInit(): void {
    this.myLocation()
  }
  addReport(form: NgForm, l: HTMLInputElement,img:any): void {
    l.value = this.getLocation()
    if (!l.value) {
      this.myLocation()
      this.msg = 'Allow Location'
      return
    }
    const formData = new FormData()
    formData.append('name',form.value.name)
    formData.append('image',img.files[0])
    formData.append('location',l.value)
    formData.append('category',form.value.category)
    formData.append('color',form.value.color)
    formData.append('description',form.value.description)
    formData.append('number',form.value.number)
    this.api.addReport(formData).subscribe((d) => {
      this.msg = 'Added Successfully'
      form.reset()
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
