import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Patient {
  id?: string;
  name: string;
  coren: string;
  birthDate: string;
  email: string;
  phoneNumber: string;
}

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private readonly API_URL = 'http://localhost:8080/api/';
  
  constructor(
    private httpClient: HttpClient
    ) { }

  getPatients(token): Observable<Patient[]> {
    let header = new HttpHeaders({ "Authorization": "Bearer "+token});
    return this.httpClient.get<any>(this.API_URL+"patients", {headers: header});
  }
  
  addPatient(dados: Patient, token){  
    const header = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: "Bearer "+token
      })
    };
    return this.httpClient.post<any>(this.API_URL+"patient/save", dados, header);
  }

  
 updatePatient(dados: Patient, id: string, token: string){
  const header = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: "Bearer "+token
    })
  };
  return this.httpClient.put<any>(this.API_URL+"patient/update/"+id, dados, header);
}

  getPatientById(id: string, token: string){
    let header = new HttpHeaders({ "Authorization": "Bearer "+token});
    return this.httpClient.get<any>(this.API_URL+"patient/get/"+id, {headers: header});
  }

  deletePatient(id: string, token: string){
    let header = new HttpHeaders({ "Authorization": "Bearer "+token}); 
    return this.httpClient.delete<any>(this.API_URL+"patient/delete/"+id, {headers: header})
  }
}
