import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { ApiService } from 'src/app/services/api.service'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void { }
}
