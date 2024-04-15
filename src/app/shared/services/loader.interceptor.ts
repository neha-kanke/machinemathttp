import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, Subject, delay, finalize, pipe, subscribeOn, takeUntil } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private _loaderservice:LoaderService) {}
unscribesubject:Subject<void>=new Subject<void>()
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
     this._loaderservice.sendloderstate(true)
     return  next.handle(request)
    .pipe(
      finalize(()=>{
        delay(1500),
        takeUntil(this.unscribesubject)
        this._loaderservice.sendloderstate(false)
      })
    )
  }
  unscripall(){
    this.unscribesubject.next()
    this.unscribesubject.complete()
  }
}
