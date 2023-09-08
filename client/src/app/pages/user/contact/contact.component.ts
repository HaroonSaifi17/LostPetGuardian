import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  msg:string=''
  sendMsg(form:NgForm):void{
   this.msg="Message is send successfully"
   form.reset()
  }
}
