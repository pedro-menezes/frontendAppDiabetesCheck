import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { User, UserService } from '../services/user.service';
import { PatientService } from '../services/patient.service';
import { Data, LaunchService } from '../services/launch.service';

@Component({
  selector: 'app-relatorio-por-data',
  templateUrl: './relatorio-por-data.page.html',
  styleUrls: ['./relatorio-por-data.page.scss'],
})

export class RelatorioPorDataPage implements OnInit {
  nurse: User;
  nurses: User[] = [];
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
          let date = l.date.split("T")[0]

          if(date >= this.startDate && date <= this.finalDate ){
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
            this.patientService.getPatientById(n, this.token).subscribe(r => {
              this.namesPatients[i] = r.name;
              i++;
            });
          }

          this.cd.detectChanges();
        } else {
          this.showAlert("No launchs found of this date!");
        }
      }else {
        this.showAlert("No launchs found of this nurse!")
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
