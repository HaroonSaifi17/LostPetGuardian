import { NgModule } from '@angular/core'
import { ExtraOptions, RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './pages/home/home.component'
import { LoginComponent } from './pages/login/login.component'
import { SignupComponent } from './pages/signup/signup.component'
import { UserComponent } from './pages/user/user.component'
import { LoginCallbackComponent } from './pages/login-callback/login-callback.component'
import { AuthGuard } from './services/auth.guard'
import { DasboardComponent } from './pages/user/dasboard/dasboard.component'
import { ContactComponent } from './pages/user/contact/contact.component'
import { ReportsComponent } from './pages/user/reports/reports.component'
import { AddComponent } from './pages/user/add/add.component'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DasboardComponent,
      },
      {
        path: 'reports',
        component: ReportsComponent,
      },
      {
        path: 'add',
        component: AddComponent,
      },
      {
        path: 'contact',
        component: ContactComponent,
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch:'full',
      },
    ],
  },
  {
    path: 'callback',
    component: LoginCallbackComponent,
  },
  { path: '**', redirectTo: '' },
]

const extraOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
}

@NgModule({
  imports: [RouterModule.forRoot(routes, extraOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
