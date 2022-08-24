import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Credenciais, UserService } from '../services/user.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.page.html',
  styleUrls: ['./alterar-senha.page.scss'],
})

export class AlterarSenhaPage implements OnInit {
  oldPassword: string = "";
  newPassword: string = "";
  confirmNewPassword: string = "";
  token: string = "";
  username: string="";
  formValido: boolean = false;
  oldPasswordValida: boolean = false;

  constructor( 
    private alertController: AlertController,
    private router: Router,
    private userService: UserService,
    private storage: Storage,
    ) { }

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
  }

  async updatePassword(){
   if(await this.validarFormulario()){
    const dados: Credenciais = {
      username: this.username,
      password: this.oldPassword
    }
    
    this.userService.login(dados).subscribe( async result => {
      this.userService.getUserByUsername(this.username).subscribe( async res => {
        this.userService.updatePassword(this.newPassword, res.id).subscribe(result => {
          this.showAlert("Password updated successfully!");
          this.router.navigateByUrl('/login', { replaceUrl: true });
        }, err => {
          console.log(err.message);
          this.showAlert("Error! Please try again.")
        });
      });
    }, err => {
      console.log(err.message);
      this.showAlert("Error! The old password is incorrect.")
      });
    }
  }

  async validarFormulario(){
    if(this.oldPassword == ""){
      this.showAlert("Fill in the field 'old password'!");
      return false;
    }else if(this.newPassword == ""){
      this.showAlert("Fill in the field 'new password'!");
      return false;
    }else if(this.confirmNewPassword == ""){
      this.showAlert("Fill in the field 'confirm new password'!");
      return false;
    }else if(this.newPassword != this.confirmNewPassword){
      this.showAlert("New password and confirm password do not match!");
      return false;
    }
    return true;
  }

  async showAlert(message) {
    const alert = await this.alertController.create({
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
