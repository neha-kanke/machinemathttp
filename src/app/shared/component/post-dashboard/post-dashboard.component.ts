import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Ipost } from '../../model/post';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PostFormComponent } from '../post-form/post-form.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.scss']
})
export class PostDashboardComponent implements OnInit, OnDestroy {
  postarr: Array<Ipost> = []
  newposuunsrcibe!: Subscription
  postupdats!:Subscription
  constructor(private _posstservices: PostService, private _matdilog: MatDialog) { }
  ngOnDestroy(): void {
    this.newposuunsrcibe.unsubscribe()
    this.postupdats.unsubscribe()
  }

  ngOnInit(): void {
    this._posstservices.getallpost()
      .subscribe((res: Array<Ipost>) => {
        this.postarr = res
      })


    this.newposuunsrcibe = this._posstservices.newpostObservable$
      .subscribe((res: Ipost) => {
        this.postarr.unshift(res)
      })

 this.postupdats=   this._posstservices.upposobservable$
    .subscribe(((updatepos:Ipost)=>{
      let getindex=this.postarr.findIndex((post:Ipost)=>post.id===updatepos.id)
      this.postarr[getindex]=updatepos
  
    }))
  }



  onadd() {
    let matdilogcong = new MatDialogConfig
    matdilogcong.width = '500px'
    matdilogcong.disableClose = true
    let matdilogref = this._matdilog.open(PostFormComponent, matdilogcong)
  }

  onemidata(getpost:Ipost){
    let matdilogcong=new MatDialogConfig
    matdilogcong.width='500px',
    matdilogcong.disableClose=true
    matdilogcong.data=getpost
    let matdiloref=this._matdilog.open(PostFormComponent,matdilogcong)
  }
  ondeltepost(id:string){
    let getindex=this.postarr.findIndex((post)=>post.id===id)
    this.postarr.splice(getindex,1)
  }
}
