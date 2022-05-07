import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
    url:string= "http://localhost:8080/"
  constructor( private http: HttpClient) { }

  getPersona():Observable<any>{
    return this.http.get(this.url + 'ver/personas');
    }
}

