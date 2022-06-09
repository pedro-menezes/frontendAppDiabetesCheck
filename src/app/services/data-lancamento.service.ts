import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Firestore, collection, query, collectionData, doc, setDoc, docData, addDoc, deleteDoc, updateDoc, orderBy, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { Storage } from '@angular/fire/storage';
import { first } from 'rxjs/operators';

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
    return addDoc(lancamentoRef, lancamento);
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
      resultadoIntervencao: lancamento.resultadoIntervencao, resultadoComparativo: lancamento.resultadoComparativo
    });
  }
}