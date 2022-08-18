import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Dados, DataLancamentoService } from '../services/data-lancamento.service';
import { DataPacienteService } from '../services/data-paciente.service';
import { DataPessoaService, Pessoa } from '../services/data-pessoa.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { PatientService } from '../services/patient.service';
import { Data, LaunchService } from '../services/launch.service';

@Component({
  selector: 'app-relatorio-por-data',
  templateUrl: './relatorio-por-data.page.html',
  styleUrls: ['./relatorio-por-data.page.scss'],
})
export class RelatorioPorDataPage implements OnInit {
  nurse: Pessoa;
  nurses: Pessoa[] = [];
  startDate: string;
  finalDate: string;
  result: Data[] = [];
  launchs: Data[] = [];
  l: Data;
  idsPatients: string[] = [];
  namesPatients: string[] = [];
  token: string = "";
  username: string="";

  constructor(
    private alertController: AlertController,
    private userService: UserService,
    private patientService: PatientService,
    private launchService: LaunchService,
    private storage: Storage,
    private cd: ChangeDetectorRef,
    private router: Router
  ) { 
}

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

    this.userService.getUsers(this.token).subscribe(res => {
      for (let l of res) {
        var roles = l.roles;
        for (let m of roles) {
          if (m.name == "ROLE_NURSE") {
            this.nurses.push(l);
          }
        }
      }
    });
  }

  listPatients(){
    
    this.result = [];
    this.launchs = [];
    this.idsPatients = [];
    this.namesPatients = [];

    let coren = this.nurse.coren.toString();
    
    //Lista todos os lançamentos realizados por aquele enfermeiro
    this.launchService.getLaunchsByCoren(coren, this.token).subscribe(res => {
      this.result = res;

      //Se existir pelo menos um lançamento
      if(res.length > 0){

        //Percorre todos os lançamentos e verifica se a data está no intervalo
        var i = 0;
        for(let l of this.result){
          var timestamp = Object.values(l.date);
          var seconds = parseInt(timestamp[0]);
          
          var dataCompleta = new Date(seconds * 1000)
    
          var dia = dataCompleta.getDate();
          var mes = dataCompleta.getMonth() + 1;
          var ano = dataCompleta.getFullYear();
          var data = ano + "-" + mes + "-" + dia;

          if(mes < 10 && dia < 10){
            data = ano + "-0" + mes + "-0" + dia;
          } else if(dia < 10 && mes > 10){
            data = ano + "-" + mes + "-0" + dia;
          }else if (dia > 10 && mes < 10){
            data = ano + "-0" + mes + "-" + dia;
          }

          if(data >= this.startDate && data <= this.finalDate ){
            this.launchs[i] = l;
            i++;
          }
        }

        //Se estiver pelo menos uma data no intervalo
        if(this.launchs.length > 0){
          
          i = 0;
          //Armazena os ids dos pacientes desses lançamentos válidos
          for(let m of this.launchs){
            this.idsPatients[i] = m.idPatient;
            i++;
          }
       
          i = 0;
          //Armazena os nomes dos pacientes, buscando por id
          for(let n of this.idsPatients){
            this.patientService.getPatientById(n, this.token).subscribe(res => {
              this.namesPatients[i] = res.nome;
              i++;
            });
          }

          this.cd.detectChanges();
        } else {
          this.showAlert("Não tem nenhum lançamento nessa data!");
        }
      }else {
        this.showAlert("Não existem lançamentos feitos por esse enfermeiro!")
      }
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
