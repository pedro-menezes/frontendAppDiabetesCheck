import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface Credenciais {
  username: string;
  password: string;
}

export interface Role{
  id: number;
  name: string;
}

export interface Dados {
  id?: number;
  name: string,
  username: string;
  password: string;
  roles: Role[];
  status: number; //ativo - 1    desativado - 0
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly API_URL = 'http://localhost:8080/api/';
  
  constructor(
    private httpClient: HttpClient
    ) { }

  login(dados: Credenciais) {
    return this.httpClient.post<any>(this.API_URL+"login?username="+dados.username+"&password="+dados.password, JSON.stringify(dados));
  }

 updateName(name: string, id: string, token: string){
    const header = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: "Bearer "+token
      })
    };
    return this.httpClient.put<any>(this.API_URL+"user/update/"+id, name, header);
  }

  getUserByUsername(username: string, token: string){
    let header = new HttpHeaders({ "Authorization": "Bearer "+token});
    return this.httpClient.get<any>(this.API_URL+"user/get/"+username, {headers: header});
  }

  getUsers(token: string){
    let header = new HttpHeaders({ "Authorization": "Bearer "+token});
    return this.httpClient.get<any>(this.API_URL+"users", {headers: header});
  }

  getRoles(username: string){
    return this.httpClient.get<any>(this.API_URL+"user/getRoles/"+username);
  }

  addUser(dados: Dados){  
    return this.httpClient.post<any>(this.API_URL+"user/save", dados);
  }

  deleteUser(id: string, token: string){
    let header = new HttpHeaders({ "Authorization": "Bearer "+token}); 
    return this.httpClient.delete<any>(this.API_URL+"user/delete/"+id, {headers: header})
  }
}