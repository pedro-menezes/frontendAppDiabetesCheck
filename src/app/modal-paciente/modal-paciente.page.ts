import { Component, OnInit, Input } from '@angular/core';
import { Paciente, DataPacienteService } from '../services/data-paciente.service';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modal-paciente',
  templateUrl: './modal-paciente.page.html',
  styleUrls: ['./modal-paciente.page.scss'],
})
export class ModalPacientePage implements OnInit {

  @Input() id: string;
  paciente: Paciente = null;
 
  constructor(private dataService: DataPacienteService, private modalCtrl: ModalController, private toastCtrl: ToastController) { }
 
  ngOnInit() {
    this.dataService.getPacienteById(this.id).subscribe(res => {
      this.paciente = res;
    });
  }
 
  async deletarPaciente() {
    await this.dataService.deletePaciente(this.paciente);
    const toast = await this.toastCtrl.create({
      message: 'Exclusão realizada com sucesso!',
      duration: 2000
    });
    toast.present();
    this.modalCtrl.dismiss();
  }
 
  async atualizarPaciente() {
    await this.dataService.updatePaciente(this.paciente);
    const toast = await this.toastCtrl.create({
      message: 'Dados atualizados com sucesso!',
      duration: 2000
    });
    toast.present();
    this.modalCtrl.dismiss();
  }
}