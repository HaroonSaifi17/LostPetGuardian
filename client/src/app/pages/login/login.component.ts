import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router'
import { ApiService } from 'src/app/services/api.service'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  error:string=''
  constructor(private router: Router, private api: ApiService) { }
  ngOnInit(): void {
    const token = localStorage.getItem('token')
    if (token) {
      this.router.navigate(['/user'], {
        queryParams: {
          token: null,
        },
        queryParamsHandling: 'merge',
      })
      return
    }
  }
  googleLogin(): void {
    window.location.href = environment.ApiUrl + '/login'
  }
  login(data:NgForm): void {

    this.api.login(data.value).subscribe((d) => {
      localStorage.setItem('token', d.token)
      this.router.navigate(['/user'])
    },(e)=>{
      this.error="Invalid Email and Password"
    })
  }
}
