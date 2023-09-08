import { Component, OnInit } from '@angular/core'
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
  login(email: string, password: string): void {
    let data = {
      email: email,
      password: password,
    }

      console.log(data)
    this.api.login(data).subscribe((d) => {
      localStorage.setItem('token', d.token)
      this.router.navigate(['/user'])
    },(e)=>{
      console.log("erro",e,data)
      this.error="Incorrect Email and Password"
    })
  }
}
