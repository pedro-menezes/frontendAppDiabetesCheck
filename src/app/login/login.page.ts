import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, MenuController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { AvatarService } from '../services/avatar.service';
import { DataPessoaService, isAdmin } from '../services/data-pessoa.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    public menuCtrl: MenuController,
    private router: Router,
    private pessoaService: DataPessoaService
  ) {}
 
  // Easy access for form fields
  get email() {
    return this.credentials.get('email');
  }
 
  get password() {
    return this.credentials.get('password');
  }
 
  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
 
  async register() {

    if(this.credentials.valid){
      const loading = await this.loadingController.create();
      await loading.present();
  
      const user = await this.authService.register(this.credentials.value);
      await loading.dismiss();
  
      if (user) {
        this.router.navigateByUrl('/criar-conta', { replaceUrl: true });
      } else {
        this.showAlert('Erro na criação da conta', 'Por favor, tente novamente!');
    }
  }else {
    this.showAlert('Erro na criação da conta', 'Preencha os campos com dados válidos!');
  }
}
 
  async login() {
    const loading = await this.loadingController.create();
    await loading.present();
 
    const user = await this.authService.login(this.credentials.value);
    await loading.dismiss();
 
    if (user) {
      const pessoa = await this.pessoaService.getPerfilPessoa(user.user.uid);

        if(isAdmin(pessoa)){
          this.router.navigateByUrl('/home-admin', { replaceUrl: true });
        } else {
          this.router.navigateByUrl('/home', { replaceUrl: true });
        }
    } else {
      this.showAlert('Erro no login', 'Por favor, tente novamente!');
    } 
  }
 
  async showAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}