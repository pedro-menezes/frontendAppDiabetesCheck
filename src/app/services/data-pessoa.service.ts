import { Injectable } from '@angular/core';
import { Firestore, collection, query, collectionData, doc, setDoc, docData, addDoc, deleteDoc, updateDoc, orderBy } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { Storage } from '@angular/fire/storage';
import { first } from 'rxjs/operators';

export interface Pessoa {
  id?: string;
  nome: string;
  coren: string;
  tipoPerfil: string;
}

export function isAdmin(p: Pessoa): Boolean {
  return p.tipoPerfil == '1';
}

@Injectable({
  providedIn: 'root'
})
export class DataPessoaService {
 
  constructor(private firestore: Firestore,
              private auth: Auth
              ) { }


  async addDados( nome: string, coren: string, tipoPerfil: string) {
    const user = await this.auth.currentUser;
    try {
      const userDocRef = doc(this.firestore, `users/${user.uid}`);
      await setDoc(userDocRef, {
        nome, coren, tipoPerfil
      });
      return true;
    } catch (e) {
      return null;
    }
  }

  preencheCamposUsuario(id){
    try {
      const userDocRef = doc(this.firestore, `users/${id}`);
      return docData(userDocRef, { idField: 'id' }) as Observable<Pessoa>;
    } catch (e) {
      return null;
    }
  }

  async getUser(){
    const user = await this.auth.currentUser;
    return user.uid;
  }

  getPerfilPessoa(id: string): Promise<Pessoa> {
    const pessoaDocRef = doc(this.firestore, `users/${id}`);
    return (docData(pessoaDocRef, { idField: 'id' }).pipe(first()) as Observable<Pessoa>).toPromise();
  }

  getPessoaById(id): Observable<Pessoa> {
    const pessoaDocRef = doc(this.firestore, `users/${id}`);
    return docData(pessoaDocRef, { idField: 'id' }) as Observable<Pessoa>;
  }
            
  getPessoas(): Observable<Pessoa[]> {
    const pessoasRef = query(collection(this.firestore, 'users'), orderBy("nome"));
    return collectionData(pessoasRef,  { idField: 'id'}) as Observable<Pessoa[]>;
  }
 
  deletePessoa(pessoa: Pessoa) {
    const pessoaDocRef = doc(this.firestore, `users/${pessoa.id}`);
    return deleteDoc(pessoaDocRef);
  }
 
  updatePessoa(pessoa: Pessoa) {
    const pessoaDocRef = doc(this.firestore, `users/${pessoa.id}`);
    return updateDoc(pessoaDocRef, { nome: pessoa.nome, cpf: pessoa.coren,
       tipoPerfil: pessoa.tipoPerfil});
  }
}