import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Data {
  id?: string;
  date: string;
  idPatient: string;
  coren: string;
  age: number;
  height: number;
  weight: number;
  triglycerides: number;
  evolutionaryTime: number;
  abdominalCircumference: number;
  income: number;
  schooling: number;
  interventionResult: number;
  comparativeResult: number;
}

@Injectable({
  providedIn: 'root'
})
export class LaunchService {
  private readonly API_URL = 'http://localhost:8080/api/';
  private readonly APIGrupo1 = 'http://localhost:8080/api/diabetesIntervention';
  private readonly APIGrupo2 = 'http://localhost:8080/api/diabetesComparative';

  calcularInterventionGroup(dados: Data) : Observable<number>{
    return this.httpClient.post<number>(this.APIGrupo1, dados);
  }
 
  calcularComparativeGroup(dados: Data) : Observable<number>{
    return this.httpClient.post<number>(this.APIGrupo2, dados);
  }
  
  constructor(
    private httpClient: HttpClient) {}

  getLaunchsByIdPatient(id, token): Observable<Data[]> {
    let header = new HttpHeaders({ "Authorization": "Bearer "+token});
    return this.httpClient.get<any>(this.API_URL+"launch/getByIdPatient/"+id, {headers: header});
  }

  addLaunch(dados: Data, token) {
    const header = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: "Bearer "+token
      })
    };
    return this.httpClient.post<any>(this.API_URL+"launch/save", dados, header);
  }

  getLaunchsByCoren(coren: string, token: string) : Observable<Data[]>{
    let header = new HttpHeaders({ "Authorization": "Bearer "+token});
    return this.httpClient.get<any>(this.API_URL+"launch/getByCoren/"+coren, {headers: header});
  }

  getLaunchById(id: string, token: string){
    let header = new HttpHeaders({ "Authorization": "Bearer "+token});
    return this.httpClient.get<any>(this.API_URL+"launch/get/"+id, {headers: header});
  }

  deleteLaunch(id: string, token: string){
    let header = new HttpHeaders({ "Authorization": "Bearer "+token}); 
    return this.httpClient.delete<any>(this.API_URL+"launch/delete/"+id, {headers: header})
  }

  updateLaunch(dados: Data, id: string, token: string){
    const header = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: "Bearer "+token
      })
    };
    return this.httpClient.put<any>(this.API_URL+"launch/update/"+id, dados, header);
  }
}
