import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private api:ApiService,private router:Router){}
  msg:string=''
  signup(form:NgForm,password1:string,password2:string):void{
   if(password1!==password2){
      this.msg="Unmatach Passward"
      return
    }
    this.api.signup(form.value).subscribe(data=>{
      localStorage.setItem('token',data.token)
        this.router.navigate(['/user'])
    })
  }

}
