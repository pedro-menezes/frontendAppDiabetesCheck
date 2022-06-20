import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(
    private alertCtrl: AlertController
    ) { }

  ngOnInit() {
  }

  async maisInfo(){
    const alert = await this.alertCtrl.create({
      header: 'More information',
      message: "This app was developed by Isabela Jesus",
      buttons: ['OK']
    });
    await alert.present();
  }
}
