import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoaderService } from './shared/services/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit ,OnDestroy{
  isloading!:boolean
  title = 'machinemathttp';
  constructor(private loaderservice:LoaderService){}



  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  
  loderunscrip!:Subscription
  ngOnInit(): void {
   this.loderunscrip=this.loaderservice.loderonserval$
   .subscribe(res=>{
    this.isloading=res
   })
  }

}
