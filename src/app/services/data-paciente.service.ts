import { Injectable } from '@angular/core';
import { Firestore, query, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { orderBy } from 'firebase/firestore';
import { Observable } from 'rxjs';

export interface Paciente {
  id?: string;
  nome: string;
  coren: string;
  dataNascimento: string;
  telefone: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataPacienteService {

  constructor(private firestore: Firestore) { }
 
  getPacientes(): Observable<Paciente[]> {
    const pacienteRef = query(collection(this.firestore, 'pacientes'), orderBy("nome"));
    return collectionData(pacienteRef, { idField: 'id'}) as Observable<Paciente[]>;
  }
 
  getPacienteById(id): Observable<Paciente> {
    const pacienteDocRef = doc(this.firestore, `pacientes/${id}`);
    return docData(pacienteDocRef, { idField: 'id' }) as Observable<Paciente>;
  }
 
  addPaciente(paciente: Paciente) {
    const pacienteRef = collection(this.firestore, 'pacientes');
    return addDoc(pacienteRef, paciente);
  }
 
  deletePaciente(paciente: Paciente) {
    const pacienteDocRef = doc(this.firestore, `pacientes/${paciente.id}`);
    return deleteDoc(pacienteDocRef);
  }
 
  updatePaciente(paciente: Paciente) {
    const pacienteDocRef = doc(this.firestore, `pacientes/${paciente.id}`);
    return updateDoc(pacienteDocRef, { nome: paciente.nome, coren: paciente.coren, dataNascimento: paciente.dataNascimento, telefone: paciente.telefone, email: paciente.email});
  }
}