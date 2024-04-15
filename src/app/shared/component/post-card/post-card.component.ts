import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ipost } from '../../model/post';
import { MatDialog } from '@angular/material/dialog';
import { GetconfirmationComponent } from '../getconfirmation/getconfirmation.component';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
    @Input() postobj!:Ipost
    @Output() editemitdata:EventEmitter<Ipost>=new EventEmitter<Ipost>()
    @Output() delteemidid:EventEmitter<string>=new EventEmitter<string>()
  constructor( private _matdilog:MatDialog,private postserviee:PostService) { }

  ngOnInit(): void {
  }
  oneditpost(){
    this.editemitdata.emit(this.postobj)

  }
  ondeltepost(){
    let matdiloref=this._matdilog.open(GetconfirmationComponent,{width:'500px'});
    matdiloref.afterClosed()
    .subscribe((getconfrim:Boolean)=>{
      if(getconfrim){
        this.postserviee.removepost(this.postobj.id)
        .subscribe((res:null)=>{
          console.log(null);
          this.delteemidid.emit(this.postobj.id)

          
        })

      }
    })


  }
}
