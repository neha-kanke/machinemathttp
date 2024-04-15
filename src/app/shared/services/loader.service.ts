import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
 private loadersubject$:BehaviorSubject<boolean>= new BehaviorSubject<boolean>(false)
 loderonserval$:Observable<boolean>=this.loadersubject$.asObservable()
  constructor() { }


  sendloderstate(val:boolean){
    this.loadersubject$.next(val)
  }
}
