import { Component, OnInit, Input } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Patient, PatientService } from '../services/patient.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-modal-paciente',
  templateUrl: './modal-paciente.page.html',
  styleUrls: ['./modal-paciente.page.scss'],
})
export class ModalPacientePage implements OnInit {
  @Input() id: string;
  patient: Patient = null;
  token: string = "";
  username: string="";
 
  constructor(private patientService: PatientService, 
    private modalCtrl: ModalController, 
    private toastCtrl: ToastController,
    private storage: Storage,
    private router: Router,
    private alertController: AlertController) { }
 
  async ngOnInit() {
    await this.storage.get('access_token').then((val) => {
      this.token = val;
      if(val == null || val == ""){
        this.showAlert("Connection expired. Login again!");
        this.router.navigateByUrl('/login', { replaceUrl: true });
      }
    });

    await this.storage.get('username').then((val) => {
      this.username = val;
      if(val == null || val == ""){
        this.showAlert("Connection expired. Login again!");
        this.router.navigateByUrl('principal');
      }
    });

    this.patientService.getPatientById(this.id, this.token).subscribe(res => {
      this.patient = res;
    });
  }
 
  async deletePatient() {
    await this.patientService.deletePatient(this.patient.id, this.token).subscribe();
    const toast = await this.toastCtrl.create({
      message: 'Deletion performed successfully!',
      duration: 2000,
      color: 'success',
      position: 'bottom'
    });
    this.modalCtrl.dismiss();
    toast.present();
  }
 
  async updatePatient() {
    await this.patientService.updatePatient(this.patient, this.patient.id, this.token).subscribe();
    const toast = await this.toastCtrl.create({
      message: 'Data successfully updated!',
      duration: 2000,
      color: 'success',
      position: 'bottom'
    });
    this.modalCtrl.dismiss();
    toast.present();
  }
  
  async showAlert(message) {
    const alert = await this.alertController.create({
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}