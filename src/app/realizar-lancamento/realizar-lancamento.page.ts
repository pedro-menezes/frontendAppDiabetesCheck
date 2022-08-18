import { AlertController, RangeCustomEvent } from '@ionic/angular';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RangeValue } from '@ionic/core';
import { forkJoin } from 'rxjs';
import { PatientService, Patient } from '../services/patient.service';
import { Storage } from '@ionic/storage';
import { Data, LaunchService } from '../services/launch.service';

@Component({
  selector: 'app-realizar-lancamento',
  templateUrl: './realizar-lancamento.page.html',
  styleUrls: ['./realizar-lancamento.page.scss'],
})
export class RealizarLancamentoPage implements OnInit {
  valueAge: RangeValue;
  valueHeight: RangeValue;
  valueWeight: RangeValue;
  valueTriglycerides: RangeValue;
  valueEvolutionaryTime: RangeValue;
  valueAbdominalCircumference: RangeValue;
  valueIncome: RangeValue;
  valueSchooling: RangeValue;
  token: string = "";
  username: string="";
 
  idPatient: string;
  coren: string;
  date: string;
  age: number;
  height: number;
  weight: number;
  triglycerides: number;
  evolutionaryTime: number;
  abdominalCircumference: number;
  income: number;
  schooling: number;
  comparativeResult: number;
  interventionResult: number;

  patient: string = "";

  dados: Data = {
    idPatient: "",
    coren: "",
    date: "",
    age: 0,
    height: 0,
    weight: 0,
    triglycerides: -174,
    evolutionaryTime: -15,
    abdominalCircumference:  45,
    income: -400,
    schooling:  -8,
    interventionResult: 0,
    comparativeResult: 0
  };

  dadosPaciente: Data;

  patients: Patient[] = [];

  getValueAge(ev: Event) {
    this.valueAge = (ev as RangeCustomEvent).detail.value;
  }
  
  getValueHeight(ev: Event) {
    this.valueHeight = (ev as RangeCustomEvent).detail.value;
  }

  getValueWeight(ev: Event) {
    this.valueWeight = (ev as RangeCustomEvent).detail.value;
  }

  getValueTriglycerides(ev: Event) {
    this.valueTriglycerides = (ev as RangeCustomEvent).detail.value;
  }

  getValueEvolutionaryTime(ev: Event) {
    this.valueEvolutionaryTime = (ev as RangeCustomEvent).detail.value;
  }

  getValueAbdominalCircumference(ev: Event) {
    this.valueAbdominalCircumference = (ev as RangeCustomEvent).detail.value;
  }

  getValueIncome(ev: Event) {
    this.valueIncome = (ev as RangeCustomEvent).detail.value;
  }

  getValueSchooling(ev: Event) {
    this.valueSchooling = (ev as RangeCustomEvent).detail.value;
  }

  constructor(
    private alertController: AlertController,
    private patientService: PatientService,  
    private cd: ChangeDetectorRef,
    private router: Router,
    private storage: Storage,
    private launchService: LaunchService
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

    this.limparDados();

    this.patientService.getPatients(this.token).subscribe(res => {
      this.patients = res;
    });
  }

  async calcularDiabetes() {
    if(await this.validarDados()){
      this.dados = { 
        date: this.date,
        idPatient : this.patient,
        coren: this.coren,
        age: this.age,
        height: this.height,
        weight: this.weight,
        triglycerides: this.triglycerides,
        evolutionaryTime: this.evolutionaryTime,
        abdominalCircumference: this.abdominalCircumference,
        income: this.income,
        schooling: this.schooling,
        interventionResult: 0,
        comparativeResult: 0
      }

      forkJoin({
        requestInterventionGroup:  this.launchService.calcularInterventionGroup(this.dados),
        requestComparativeGroup:  this.launchService.calcularComparativeGroup(this.dados)
      })
      .subscribe(({requestInterventionGroup, requestComparativeGroup}) => {
        this.dados.interventionResult = requestInterventionGroup;
        this.dados.comparativeResult = requestComparativeGroup;
        this.launchService.addLaunch(this.dados, this.token).subscribe();
        this.router.navigateByUrl(`/home/resultado?rInt=${requestInterventionGroup}&rComp=${requestComparativeGroup}`, { replaceUrl: true });
      });
    }
  }
  
  validarDados() : boolean{
    if(this.patient == ""){
      this.showAlert("Fill in the field 'Patient'!");
      return false;
    }else if (this.coren == ""){
      this.showAlert("Fill in the field 'Coren'!");
      return false;
    }else if(this.age == 0){
      this.showAlert("Fill in the field 'Age'!");
      return false;
    }else if (this.height == 0){
      this.showAlert("Fill in the field 'Height'!");
      return false;
    }else if (this.weight == 0){
      this.showAlert("Fill in the field 'Weight'!");
      return false;
    }else if (this.triglycerides == -174){
      this.showAlert("Fill in the field 'Triglycerides'!");
      return false;
    }else if (this.evolutionaryTime == -15){
      this.showAlert("Fill in the field 'Evolutionary time'!");
      return false;
    }else if (this.abdominalCircumference == 45){
      this.showAlert("Fill in the field 'Abdominal circumference'!");
      return false;
    }else if (this.income == -400){
      this.showAlert("Fill in the field 'Income'!");
      return false;
    }else if (this.schooling == -8){
      this.showAlert("Fill in the field 'Schooling'!");
      return false;
    }
    
    return true;
  }

  buscarUltimoLancamento(patient){
    this.launchService.getLaunchsByIdPatient(patient, this.token).subscribe(res => {
 
      if(res.length > 0){
   
        this.dadosPaciente = res[res.length-1];
      
        this.date = this.dadosPaciente.date;
        this.idPatient = this.dadosPaciente.idPatient;
        this.coren = this.dadosPaciente.coren;
        this.age = this.dadosPaciente.age;
        this.height = this.dadosPaciente.height;
        this.weight = this.dadosPaciente.weight;
        this.triglycerides = this.dadosPaciente.triglycerides;
        this.evolutionaryTime = this.dadosPaciente.evolutionaryTime;
        this.abdominalCircumference= this.dadosPaciente.abdominalCircumference;
        this.income = this.dadosPaciente.income;
        this.schooling = this.dadosPaciente.schooling;
        this.interventionResult = this.dadosPaciente.interventionResult;
        this.comparativeResult = this.dadosPaciente.comparativeResult;

        this.valueAge = this.age;
        this.valueHeight = this.height;
        this.valueWeight = this.weight;
        this.valueTriglycerides = this.triglycerides;
        this.valueEvolutionaryTime = this.evolutionaryTime;
        this.valueAbdominalCircumference= this.abdominalCircumference;
        this.valueIncome = this.income;
        this.valueSchooling = this.schooling;

        this.cd.detectChanges();

      } else{
        this.dadosPaciente = {
          date : "",
          idPatient: "",
          coren: "",
          age: 0,
          height: 0,
          weight: 0,
          triglycerides: 0,
          evolutionaryTime: 0,
          abdominalCircumference: 0,
          income: 0,
          schooling: 0,
          interventionResult: 0,
          comparativeResult: 0
        }

       this.limparDados();
      }
    });
  }

  limparDados(){
    this.idPatient = "";
    this.coren = "";
    this.date = "";
    this.age = 0;
    this.height = 0;
    this.weight = 0;
    this.triglycerides = -174;
    this.evolutionaryTime = -15;
    this.abdominalCircumference =  45;
    this.income = -400;
    this.schooling =  -8;
    this.interventionResult = 0;
    this.comparativeResult = 0
  }
  
  async showAlert(message) {
    const alert = await this.alertController.create({
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}