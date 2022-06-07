import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DataPessoaService } from '../services/data-pessoa.service';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { AvatarService } from '../services/avatar.service';

@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.page.html',
  styleUrls: ['./criar-conta.page.scss'],
})
export class CriarContaPage implements OnInit {
  profile = null;
  image;

  nome: string = "";
  coren: string = "";
  tipoPerfil: string = "2";

  constructor(
    private dataServicePessoa: DataPessoaService,
    private cd: ChangeDetectorRef,
    private alertController: AlertController,
    private router: Router,
    public menuCtrl: MenuController,
    private avatarService: AvatarService
  ) { 
    this.avatarService.getUserProfile().subscribe((data) => {
      this.profile = data;
    });
  }

  ngOnInit() {
    this.menuCtrl.enable(false);
  }

  validarDados(): boolean {
    if(this.nome == ""){
      this.showAlert("Preencha o campo nome!");
      return false;
    }else if(this.coren == ""){
      this.showAlert("Preencha o campo coren!");
        return false;
    }
    return true;
  }

  async addAcount(){
    if(await this.validarDados()){
      this.dataServicePessoa.addDados(this.nome, this.coren, this.tipoPerfil);
      this.showAlert("Conta criada com sucesso!");
      this.router.navigateByUrl('/login', { replaceUrl: true });
    }
  }

  async showAlert(message) {
    const alert = await this.alertController.create({
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
