import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { ApiService } from 'src/app/services/api.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  profile:boolean=false
  name$?:Observable<{name:string}>
  constructor(private router: Router,private api:ApiService) { }

  ngOnInit(): void {
  this.name$=this.api.getName()
  }

  toggleClass(list: HTMLDivElement): void {
    if (list.style.left == '0px') {
      list.style.left = '-100%'
    } else {
      list.style.left = '0px'
    }
  }
  logout(): void {
    this.api.logout()
  }
}
