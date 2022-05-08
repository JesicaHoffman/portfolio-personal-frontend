import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
    url:string= "http://localhost:8080/"
  constructor( private http: HttpClient) { }

  getAbout(){
    return this.http.get(this.url + 'ver/sobremi')
    }

  modifyAbout(sobreMi: any){
    return this.http.put(this.url + 'modificar/sobremi', sobreMi)
  }

  deleteAbout(id: any){
    return this.http.delete(`${this.url}delete/sobremi/${id}`)
  }

}

