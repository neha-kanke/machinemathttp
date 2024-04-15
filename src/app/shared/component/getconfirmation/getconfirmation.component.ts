import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-getconfirmation',
  templateUrl: './getconfirmation.component.html',
  styleUrls: ['./getconfirmation.component.scss']
})
export class GetconfirmationComponent implements OnInit {

  constructor(private matdiloref:MatDialogRef<GetconfirmationComponent>) { }

  ngOnInit(): void {
  }
  onconfirm(){
    this.matdiloref.close(true)

  }

  onCancel(){
    this.matdiloref.close(false)

  }
}
