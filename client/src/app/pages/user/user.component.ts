import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  isClassAdded: boolean = false

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
  }
  addClassToElement(b:any): void {
    this.isClassAdded = !this.isClassAdded
    if(b.style.marginRight=='0px' || b.style.marginRight=='')
  {
     b.style.marginRight='-90.46px'
    }else{
      b.style.marginRight='0px'
    }
  }
  userLogout(): void {
    this.api.logout()
  }
  goHome():void{
    this.router.navigate(['/'])
  }
}
