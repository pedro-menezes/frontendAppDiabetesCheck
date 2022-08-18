import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { User, UserService } from '../services/user.service';
import { Email, EmailService } from '../services/email.service';

@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.page.html',
  styleUrls: ['./criar-conta.page.scss'],
})
export class CriarContaPage implements OnInit {
  repeatPassword: string = "";

  user: User = {
    name: "",
    username: "",
    password: "",
    roles: [{
      "id": 2,
      "name": "ROLE_NURSE"
    }],
    coren: "",
    status: 0,  //0 = destivado
  }

  email: Email = {
    destiny: "",
    title: "",
    body: ""
  }

  constructor(
    private emailService: EmailService,
    private alertController: AlertController,
    private router: Router,
    private userService: UserService
  ) { }
 
  ngOnInit() {
  }

  async addAccount(){
    if(this.validarFormulario()){
      if(this.validarSenha()){
        this.userService.addUser(this.user).subscribe(res =>{
          this.showAlert("Account created successfully! Wait for administrator approval.");
          this.router.navigateByUrl('/login', { replaceUrl: true });
        }, err => {
          this.showAlert('Error! Please try again!');
        });

        //Email to admin
        this.email.destiny = "isabelac396@gmail.com";
        this.email.title = "Aprovação de acesso";
        this.email.body = "Informamos que o usuário '"+ this.user.username + "' criou uma conta no app."+
        " Realize a aprovação para que ele possa fazer acesso.";
        this.emailService.send(this.email).subscribe();
      }
    }
  }

  validarSenha(){
    if(this.repeatPassword != this.user.password){
      this.showAlert('Error! Passwords do not match!');
      return false;
    }
    return true;
  }

  validarFormulario(){
    if(this.user.name == ""){
      this.showAlert("Fill in the field 'name'!");
      return false;
    }else if(this.user.coren == ""){
      this.showAlert("Fill in the field 'coren'!");
      return false;
    }else if(this.user.username == ""){
      this.showAlert("Fill in the field 'username'!");
      return false;
    }else if(this.user.password == ""){
      this.showAlert("Fill in the field 'password'!");
      return false;
    }else if(this.user.password.length < 5){
      this.showAlert("Very short password!");
      return false;
    }else if(this.repeatPassword == ""){
      this.showAlert("Fill in the field 'repeat password'!");
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