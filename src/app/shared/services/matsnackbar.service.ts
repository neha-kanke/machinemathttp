import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MatsnackbarService {

  constructor(private matsackbat:MatSnackBar) { }


  openmatbar(sms:string,action:string){
    this.matsackbat.open(sms,action,{
      horizontalPosition:'center',
      verticalPosition:'top'
    })
  }
}
