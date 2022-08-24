import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { Data, LaunchService } from '../services/launch.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-modal-lancamento',
  templateUrl: './modal-lancamento.page.html',
  styleUrls: ['./modal-lancamento.page.scss'],
})
export class ModalLancamentoPage implements OnInit {
  @Input() id: string;
  launch: Data = {
    idPatient: "",
    coren: "",
    date: "",
    age: 0,
    height: 0,
    weight: 0,
    triglycerides: -174,
    evolutionaryTime: -15,
    abdominalCircumference:  45,
    income: -400,
    schooling:  -8,
    interventionResult: 0,
    comparativeResult: 0
  };
  token: string = "";
  username: string="";

  constructor(
    private launchService:LaunchService, 
    private modalCtrl: ModalController, 
    private toastCtrl: ToastController,
    private router: Router,
    private storage: Storage,
    private alertController: AlertController
  ) 
  { }
 
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

    this.launchService.getLaunchById(this.id, this.token).subscribe(res => {
      this.launch = res;
      this.launch.date = this.formatDate(this.launch.date);
    }); 
  }

  formatDate(date){
    let dateF = date.split("T")[0];
    let time = date.split("T")[1].split(".")[0];
    return dateF + "   " + time;
  }

  async deleteLaunch() {
    await this.launchService.deleteLaunch(this.launch.id, this.token).subscribe();
    const toast = await this.toastCtrl.create({
      message: 'Deletion performed successfully!',
      duration: 2000,
      color: 'success',
      position: 'bottom'
    });
    this.modalCtrl.dismiss();
    toast.present();
    document.location.reload();
  }
 
  async updateLaunch() {
    this.launch.date = "";
    forkJoin({
      requestInterventionGroup:  this.launchService.calcularInterventionGroup(this.launch),
      requestComparativeGroup:  this.launchService.calcularComparativeGroup(this.launch)
    })
    .subscribe(({requestInterventionGroup, requestComparativeGroup}) => {
      this.launch.interventionResult = requestInterventionGroup;
      this.launch.comparativeResult = requestComparativeGroup;
      this.launchService.updateLaunch(this.launch, this.launch.id, this.token).subscribe();
    //  this.router.navigateByUrl(`/home/resultado?rInt=${requestInterventionGroup}&rComp=${requestComparativeGroup}`, { replaceUrl: true });
    });
  
    //await this.dataLancamentoService.updateLancamento(this.lancamento);
    const toast = await this.toastCtrl.create({
      message: 'Data successfully updated!',
      duration: 2000,
      color: 'success',
      position: 'bottom'
    });
    this.modalCtrl.dismiss();
    toast.present();
    //document.location.reload();
  } 

  async showAlert(message) {
    const alert = await this.alertController.create({
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}