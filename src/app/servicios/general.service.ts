import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
    url:string= "https://jesica-hoffman.herokuapp.com/"
  constructor( private http: HttpClient) { }

  getAbout():Observable<any>{
    return this.http.get(this.url + 'ver/sobremi');
    }

  modifyAbout(sobreMi: any):Observable<any>{
    return this.http.put(this.url + 'modificar/sobremi', sobreMi);
  }

  deleteAbout(id: any):Observable<any>{
    return this.http.delete(`${this.url}delete/sobremi/${id}`);
  }

  getPersona():Observable<any>{
    return this.http.get(this.url + 'ver/personas');
  }

  modifyPersona(per: any):Observable<any>{
    return this.http.put(this.url + 'modificar/persona', per);
  }

  deletePersona(id: any):Observable<any>{
    return this.http.delete(`${this.url}delete/${id}`);
  }

  getSkills():Observable<any>{
    return this.http.get(this.url + 'ver/skills');
  }

  modifySkills(skill: any):Observable<any>{
    return this.http.put(this.url + 'modificar/skill', skill);
  }

  deleteSkill(id: any):Observable<any>{
    return this.http.delete(`${this.url}delete/skill/${id}`);
  }

  newSkill(skill: any):Observable<any>{
    return this.http.post(this.url + 'new/skill', skill);
  }
  getExperiencia():Observable<any>{
    return this.http.get(this.url + 'ver/Experiencias');
  }

  modifyExperiencia(exp: any):Observable<any>{
    return this.http.put(this.url + 'modificar/experiencia', exp);
  }

  deleteExperiencia(id: any):Observable<any>{
    return this.http.delete(`${this.url}delete/Experiencia/${id}`);
  }

  newExperiencia(exp: any):Observable<any>{
    return this.http.post(this.url + 'new/experiencia', exp);
  }

  getEducacion():Observable<any>{
    return this.http.get(this.url + 'ver/educacion');
  }

  modifyEducacion(educ: any):Observable<any>{
    return this.http.put(this.url + 'modificar/educacion', educ);
  }

  deleteEducacion(id: any):Observable<any>{
    return this.http.delete(`${this.url}delete/educacion/${id}`);
  }

  newEducacion(educ: any):Observable<any>{
    return this.http.post(this.url + 'new/educacion', educ);
  }
}

