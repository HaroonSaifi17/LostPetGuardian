import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { Router } from '@angular/router'

@Injectable()
export class CorsInterceptor implements HttpInterceptor {
  constructor(private router: Router) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token')

      request = request.clone({
        setHeaders: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Max-Age': '86400',
          Authorization: `Bearer ${token}`,
        },
      })


    return next.handle(request).pipe(
      catchError((error: any) => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
              localStorage.removeItem('token')
              this.router.navigate(['/login'])
              return new Observable<HttpEvent<any>>()
            } else {
              this.router.navigate(['/'])
              return throwError(error)
            }
          } else {
            this.router.navigate(['/'])
            return throwError(error)
          }
      })
    )
  }
}
