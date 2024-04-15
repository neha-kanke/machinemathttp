import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ipost } from '../model/post';
import { MatsnackbarService } from './matsnackbar.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
postUrl:string=`${environment.baseUrl}/posts.json`
private newpostsubject$:Subject<Ipost>=new Subject<Ipost>();
private updatepostsubject$:Subject<Ipost>=new Subject<Ipost>()
upposobservable$:Observable<Ipost>=this.updatepostsubject$.asObservable()
newpostObservable$:Observable<Ipost>=this.newpostsubject$.asObservable()
  constructor(private http:HttpClient) { }


getallpost():Observable<Array<Ipost>>{
  return this.http.get<Array<Ipost>>(this.postUrl)
  .pipe(
    map((res:any)=>{
      let postarr:Array<Ipost>=[]
      for (const key in res) {
        postarr.unshift({...res[key],id:key})
      }
      return postarr
    })
    
  )

}
sendnewpost(Npost:Ipost):Observable<Ipost>{
 return this.http.post<Ipost>(this.postUrl,Npost)
}

sendnpost(npost:Ipost){
  this.newpostsubject$.next(npost)
}
updatepost(uppost:Ipost):Observable<Ipost>{
  let updateUrl=`${environment.baseUrl}/posts/${uppost.id}.json`
 return this.http.patch<Ipost>(updateUrl,uppost)
 
}

updatasendpost(uppost:Ipost){
 this.updatepostsubject$.next(uppost)

}

removepost(id:string):Observable<null>{
  let deletUrl=`${environment.baseUrl}/posts/${id}.json`
  return this.http.delete<null>(deletUrl)
}



}
