import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController} from '@ionic/angular';
import { Credenciais, UserService } from '../services/user.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit{
  username: string = "";
  password: string = "";

  constructor( 
    private alertController: AlertController,
    private userService: UserService,
    private router: Router,
    private storage: Storage
    ) {}

  ngOnInit(): void {
    this.username = "";
    this.password = "";
  }

  login(){
    if(this.validarFormulario()){
      const dados: Credenciais = {
        username: this.username,
        password: this.password
      }

      this.userService.login(dados).subscribe( async result =>{
        let token = result.access_token;
        await this.storage.set('access_token', token);
        await this.storage.set('username', dados.username);
        this.userService.getUserByUsername(this.username).subscribe(res => {
          if (res.status == "0") {
            this.showAlert("Error! This has not yet been activated by the admin.");
          } else {
            if (this.isAdmin(res.roles)){
              this.router.navigateByUrl('/home-admin', { replaceUrl: true });

            }else{
              this.router.navigateByUrl('/home', { replaceUrl: true });
            }
          }
        }); 
      }, err => {
        console.log(err.message);
        this.showAlert("Authentication error. Try again.")
      });
    }
  }

  validarFormulario(){
    if(this.username == ""){
      this.showAlert("Fill in the field 'username'!");
      return false;
    }else if(this.password == ""){
      this.showAlert("Fill in the field 'password'!");
      return false;
    }
    return true;
  }

  isAdmin(roles){
    var admin = false;
    for(let l of roles){
      if(l.name == "ROLE_ADMIN"){
        admin = true;
      }
      return admin;
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
