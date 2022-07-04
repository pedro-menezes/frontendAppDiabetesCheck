import { Component, OnInit } from '@angular/core';
import { DataPessoaService } from '../services/data-pessoa.service';
import { Router } from '@angular/router';
import { AlertController, LoadingController, MenuController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.page.html',
  styleUrls: ['./criar-conta.page.scss'],
})
export class CriarContaPage implements OnInit {
  profile = null;
  image;
  tipoPerfil: string = "2";
  credentials: FormGroup;

  constructor(
    private dataServicePessoa: DataPessoaService,
    private alertController: AlertController,
    private router: Router,
    public menuCtrl: MenuController,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private authService: AuthService
  ) { 
  }
 
  // Easy access for form fields
  get email() {
    return this.credentials.get('email');
  }
 
  get password() {
    return this.credentials.get('password');
  }

  get repeatedPassword() {
    return this.credentials.get('repeatedPassword');
  }

  get nome() {
    return this.credentials.get('nome');
  }

  get coren() {
    return this.credentials.get('coren');
  }
 
  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatedPassword: ['', [Validators.required]],
      coren: ['', [Validators.required]],
      nome: ['', [Validators.required]]
    });
  }

  async addAccount(){
    if(this.credentials.valid){
      if(this.validarSenha()){
        const loading = await this.loadingController.create();
        await loading.present();
    
        const user = await this.authService.register(this.credentials.value.email, this.credentials.value.password);
        await loading.dismiss();
    
        if (user) {
            this.dataServicePessoa.addDados(this.credentials.value.nome, this.credentials.value.coren, this.tipoPerfil);
            this.showAlert("", "Account created successfully!");
            this.router.navigateByUrl('/login', { replaceUrl: true });
        } else {
          this.showAlert('Account creation error', 'Please try again!');
        }
      }
    }
  }

  validarSenha(){
    if(this.credentials.value.repeatedPassword != this.credentials.value.password){
      this.showAlert('Account creation error', 'Passwords do not match!');
      return false;
    }
    return true;
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