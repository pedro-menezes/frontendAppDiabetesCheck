import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { User, UserService } from '../services/user.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-ativar-users',
  templateUrl: './ativar-users.page.html',
  styleUrls: ['./ativar-users.page.scss'],
})
export class AtivarUsersPage implements OnInit {
  token: string = "";
  username: string = "";
  users: User[] = [];

  constructor(    
    private alertCtrl: AlertController, 
    private router: Router,
    private storage: Storage,
    private alertController: AlertController,
    private userService: UserService,
   ) { }

  async ngOnInit() {
    await this.storage.get('access_token').then((val) => {
      this.token = val;
      if(val == null || val == ""){
        this.showAlert("Conexao expirada. Faca login novamente!");
        this.router.navigateByUrl('/login', { replaceUrl: true });
      }
    });

    await this.storage.get('username').then((val) => {
      this.username = val;
      if(val == null || val == ""){
        this.showAlert("Conexao expirada. Faca login novamente!");
        this.router.navigateByUrl('principal');
      }
    });

    this.getDisabledUsers();
  }

  getDisabledUsers(){
    this.userService.getUsers(this.token).subscribe(res => {
      this.users = [];
      for(let u of res){
        if(u.status == 0){
          this.users.push(u);
        }
      }
    });
  }

  activateUser(id){
    this.userService.activateUser(this.token, id).subscribe(res => {
      this.showAlert("User activated successfully!");
      this.getDisabledUsers(); 
    }, err => {
      console.log(err.message);
      this.showAlert("Error! Please try again.")
    });
  }

  async showAlert(message) {
    const alert = await this.alertController.create({
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}

