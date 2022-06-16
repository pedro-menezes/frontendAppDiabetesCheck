import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Firestore, collection, query, collectionData, doc, docData, addDoc, serverTimestamp, deleteDoc, updateDoc, orderBy, where, FieldValue } from '@angular/fire/firestore';
import {Timestamp } from 'firebase/firestore';
import { Auth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

export interface Dados {
  id?: string;
  data: string;
  idPaciente: string;
  coren: string,
  idade: number;
  altura: number;
  peso: number;
  triglicerideos: number;
  tempoEvolutivo: number;
  circunferenciaAbdominal: number;
  renda: number;
  escolaridade: number;
  resultadoIntervencao: number;
  resultadoComparativo: number;
}

@Injectable({
  providedIn: 'root'
})

export class DataLancamentoService {
  
  private readonly APIGrupo1 = '/api/diabetesIntervention';
  private readonly APIGrupo2 = '/api/diabetesComparative';

  constructor(private httpClient: HttpClient,
    private firestore: Firestore,
    private auth: Auth) {}

  calcularInterventionGroup(dados: Dados) {
    return this.httpClient.post<Dados>(this.APIGrupo1, dados);
  }
 
  calcularComparativeGroup(dados: Dados) {
    return this.httpClient.post<Dados>(this.APIGrupo2, dados);
  }

  getLancamentoById(id): Observable<Dados> {
    const lancamentoDocRef = doc(this.firestore, `lancamentos/${id}`);
    return docData(lancamentoDocRef, { idField: 'id' }) as Observable<Dados>;
  }

  getLancamentosByIdPaciente(id): Observable<Dados[]> {
    const lancamentoDocRef = query(collection(this.firestore, 'lancamentos'), where("idPaciente", "==", id), orderBy("data", "desc"));
    return collectionData(lancamentoDocRef,  { idField: 'id'}) as Observable<Dados[]>;
  }
 
  addLancamento(lancamento: Dados) {
    const lancamentoRef = collection(this.firestore, 'lancamentos');
    return addDoc(lancamentoRef, { coren: lancamento.coren, idPaciente: lancamento.idPaciente,
      idade: lancamento.idade, altura: lancamento.altura, peso: lancamento.peso, triglicerideos: 
      lancamento.triglicerideos, tempoEvolutivo: lancamento.tempoEvolutivo, circunferenciaAbdominal:
      lancamento.circunferenciaAbdominal, renda: lancamento.renda, escolaridade: lancamento.escolaridade,
      resultadoIntervencao: lancamento.resultadoIntervencao, resultadoComparativo: 
      lancamento.resultadoComparativo, data: serverTimestamp() }
    );
  }

  deleteLancamento(lancamento: Dados) {
    const lancamentoRef = doc(this.firestore, `lancamentos/${lancamento.id}`);
    return deleteDoc(lancamentoRef);
  }

  updateLancamento(lancamento: Dados) {
    const lancamentoDocRef = doc(this.firestore, `lancamentos/${lancamento.id}`);
    return updateDoc(lancamentoDocRef, { idPaciente: lancamento.idPaciente, coren: lancamento.coren, 
      idade: lancamento.idade, altura: lancamento.altura, peso: lancamento.peso, triglicerideos: 
      lancamento.triglicerideos, tempoEvolutivo: lancamento.tempoEvolutivo, circunferenciaAbdominal:
      lancamento.circunferenciaAbdominal, renda: lancamento.renda, escolaridade: lancamento.escolaridade,
      resultadoIntervencao: lancamento.resultadoIntervencao, resultadoComparativo: lancamento.resultadoComparativo,
      data: serverTimestamp()
    });
  }
}