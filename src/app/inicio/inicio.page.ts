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
      header: 'Mais informações',
      message: "Este app foi desenvolvido por Isabela Jesus",
      buttons: ['OK']
    });
    await alert.present();
  }
}
