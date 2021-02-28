import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { catchError } from "rxjs/operators";

@Injectable()
export class ShortInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const TOKEN = '1223cd81e372918b457b010708e2c58de63dcc7e';

    request = request.clone({setHeaders: {Authorization: `Bearer ${TOKEN}`}})
    return next.handle(request);

    // MANEJAR ERROR DESDE AQUÍ


    // return next.handle(request).pipe(
    //   catchError((error: HttpErrorResponse) => {
    //     return throwError(error);
    //   })
    // );
  }
}
