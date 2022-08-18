import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface Email {
  destiny: string,
  title: string,
  body: string
}

@Injectable({
  providedIn: 'root'
})

export class EmailService {
  
  private readonly API_URL = 'http://localhost:8080/apiemail/';

  constructor(
    private httpClient: HttpClient
    ) { }

  send(email: Email) {
    return this.httpClient.post<any>(this.API_URL+"send", email);
  }
}