import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AlertController, ModalController} from '@ionic/angular';
import { DataPacienteService, Paciente } from '../services/data-paciente.service';
import { ModalPacientePage } from '../modal-paciente/modal-paciente.page';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { DataPessoaService } from '../services/data-pessoa.service';
import { getNumberOfCurrencyDigits } from '@angular/common';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.page.html',
  styleUrls: ['./pacientes.page.scss'],
})
export class PacientesPage implements OnInit {
  pacientes: Paciente[] = [];
  corenEnfermeiroLogado: string;

  constructor(
    private dataPacienteService: DataPacienteService,  
    private dataPessoaService: DataPessoaService,  
    private cd: ChangeDetectorRef, 
    private alertCtrl: AlertController, 
    private modalCtrl: ModalController,
    private authService: AuthService,
    private router: Router
    ) {
    this.dataPacienteService.getPacientes().subscribe(res => {
      this.pacientes = res;
      this.cd.detectChanges();
    });

    this.getCoren();
  }

  ngOnInit() {
  }

  async getCoren(){
    var id = await this.dataPessoaService.getUser();
    this.dataPessoaService.getPessoaById(id).subscribe(res => {
      this.corenEnfermeiroLogado = res.coren;
    })
  }

  async addPaciente() {
    const alert = await this.alertCtrl.create({
      header: 'Register patient',
      inputs: [
        {
          name: 'nome',
          placeholder: 'Name',
          type: 'text',
        },
        {
          name: 'coren',
          placeholder: 'Coren',
          type: 'text',
          value: this.corenEnfermeiroLogado,
          disabled: true
        },
        {
          name: 'dataNascimento',
          placeholder: 'Birth date',
          type: 'date'
        },
        {
          name: 'telefone',
          placeholder: 'Phone number',
          type: 'text'
        },
        {
          name: 'email',
          placeholder: 'Email',
          type: 'text'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Save',
          handler: res => {
            var dataFormatada = res.dataNascimento.split("-").reverse().join("-");
            this.dataPacienteService.addPaciente({ nome: res.nome, coren: res.coren, dataNascimento: dataFormatada, 
            telefone: res.telefone, email: res.email });
          }
        }
      ]
    });
 
    await alert.present();
  }
 
  async openPaciente(paciente: Paciente) {
    const modal = await this.modalCtrl.create({
      component: ModalPacientePage,
      componentProps: { id: paciente.id },
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.8
    });
 
    await modal.present();
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
}



