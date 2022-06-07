import { Component, OnInit } from '@angular/core';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.page.html',
  styleUrls: ['./alterar-senha.page.scss'],
})
export class AlterarSenhaPage implements OnInit {
  email: string = "";
  
  constructor( 
    private alertController: AlertController,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
  }

  alterarSenha(){
  const auth = getAuth();
  sendPasswordResetEmail(auth, this.email)
    .then(() => {
      this.showAlert("Email de recuperação de senha enviado!");
      this.router.navigateByUrl('/login', { replaceUrl: true });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
   
      if(errorCode == "auth/invalid-email"){
        this.showAlert("Erro! Email inválido!");
      }
      else if(errorCode == "auth/user-not-found"){
        this.showAlert("Erro! Usuário não encontrado!");
      }
      else if(errorCode == "auth/missing-email"){
        this.showAlert("Erro! Preencha o campo email!");
      } else {
        this.showAlert(errorCode);
      }
      this.router.navigateByUrl('/alterar-senha-pessoa', { replaceUrl: true });
    });
  }

  async showAlert(message) {
    const alert = await this.alertController.create({
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
}
