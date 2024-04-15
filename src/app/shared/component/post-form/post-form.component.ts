import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { Params } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Ipost } from '../../model/post';
import { MatsnackbarService } from '../../services/matsnackbar.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  postform!: FormGroup
  editdata!: Ipost
  userarr: Array<Number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  iseditmode: boolean = false
  constructor(private _postservice: PostService,
    @Inject(MAT_DIALOG_DATA) getdata: Ipost,
    private matdilogref: MatDialogRef<PostFormComponent>,
    private _matscanservoce:MatsnackbarService

  ) {


    this.creatpostform()
    this.editdata = getdata
    if (getdata) {
      this.iseditmode = true
      this.postform.patchValue(getdata)
    } else {
      return
    }

  }

  ngOnInit(): void {

  }
  creatpostform() {
    this.postform = new FormGroup({
      title: new FormControl(null, Validators.required),
      body: new FormControl(null, Validators.required),
      userid: new FormControl(null, Validators.required),
    })
  }



  onaddpost() {
    if (this.postform.valid) {
      let newpost = this.postform.value
      this._postservice.sendnewpost(newpost)
        .subscribe((res: Params) => {
          console.log(res);
          this._postservice.sendnpost({ ...newpost, id: res['name'] })
          this._matscanservoce.openmatbar(`post title and  ${newpost.title} postcontent ${newpost.body} is added`,'close')
          this.postform.reset()
          this.matdilogref.close()
        })


    }

  }

  onupdatedata() {
    if (this.postform.valid) {
      let updatpost = { ...this.postform.value, id: this.editdata.id }
      this._postservice.updatepost(updatpost)
        .subscribe((updatevalue: Ipost) => {
          console.log(updatevalue);
          this._postservice.updatasendpost(updatevalue)
          this._matscanservoce.openmatbar(`post title and  ${updatevalue.title} postcontent ${updatevalue.body} is added`,'close')
          this.postform.reset()
          this.matdilogref.close()
        })
    }
  }
}
