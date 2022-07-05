import { AlertController, RangeCustomEvent } from '@ionic/angular';
import { DataLancamentoService, Dados } from '../services/data-lancamento.service';
import { DataPacienteService, Paciente } from '../services/data-paciente.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RangeValue } from '@ionic/core';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-realizar-lancamento',
  templateUrl: './realizar-lancamento.page.html',
  styleUrls: ['./realizar-lancamento.page.scss'],
})
export class RealizarLancamentoPage implements OnInit {
  valorIdade: RangeValue;
  valorAltura: RangeValue;
  valorPeso: RangeValue;
  valorTriglicerideos: RangeValue;
  valorTempoEvolutivo: RangeValue;
  valorCircunferenciaAbdominal: RangeValue;
  valorRenda: RangeValue;
  valorEscolaridade: RangeValue;
 
  getValorIdade(ev: Event) {
    this.valorIdade = (ev as RangeCustomEvent).detail.value;
  }
  
  getValorAltura(ev: Event) {
    this.valorAltura = (ev as RangeCustomEvent).detail.value;
  }

  getValorPeso(ev: Event) {
    this.valorPeso = (ev as RangeCustomEvent).detail.value;
  }

  getValorTriglicerideos(ev: Event) {
    this.valorTriglicerideos = (ev as RangeCustomEvent).detail.value;
  }

  getValorTempoEvolutivo(ev: Event) {
    this.valorTempoEvolutivo = (ev as RangeCustomEvent).detail.value;
  }

  getValorCircunferenciaAbdominal(ev: Event) {
    this.valorCircunferenciaAbdominal = (ev as RangeCustomEvent).detail.value;
  }

  getValorRenda(ev: Event) {
    this.valorRenda = (ev as RangeCustomEvent).detail.value;
  }

  getValorEscolaridade(ev: Event) {
    this.valorEscolaridade = (ev as RangeCustomEvent).detail.value;
  }

  idPaciente: string;
  coren: string;
  data: string;
  idade: number;
  altura: number;
  peso: number;
  triglicerideos: number;
  tempoEvolutivo: number;
  circunferenciaAbdominal: number;
  renda: number;
  escolaridade: number;
  resultadoIntervencao: number;
  resultadoComparativo: number;

  paciente: string = "";

  dados: Dados = {
    data: "",
    idPaciente: "",
    coren: "",
    idade: 0,
    altura:  0,
    peso:  0,
    triglicerideos: -174,
    tempoEvolutivo: -15,
    circunferenciaAbdominal: 45,
    renda: -400,
    escolaridade: -8,
    resultadoIntervencao: 0,
    resultadoComparativo: 0
  };

  listaDadosPaciente: Dados[];
  dadosPaciente: Dados;

  pacientes: Paciente[] = [];

  constructor(
    private alertController: AlertController,
    private DataLancamentoService: DataLancamentoService,
    private dataPacienteService: DataPacienteService,  
    private cd: ChangeDetectorRef,
    private router: Router
  ) { 
    this.dataPacienteService.getPacientes().subscribe(res => {
      this.pacientes = res;
      this.cd.detectChanges();
    });
  }

  ngOnInit() {
    this.limparDados();
  }

  async calcularDiabetes() {
    if(await this.validarDados()){
      this.dados = { 
        data: this.data,
        idPaciente : this.paciente,
        coren: this.coren,
        idade: this.idade,
        altura: this.altura,
        peso: this.peso,
        triglicerideos: this.triglicerideos,
        tempoEvolutivo: this.tempoEvolutivo,
        circunferenciaAbdominal: this.circunferenciaAbdominal,
        renda: this.renda,
        escolaridade: this.escolaridade,
        resultadoIntervencao: 0,
        resultadoComparativo: 0
      }

      forkJoin({
        requestInterventionGroup:  this.DataLancamentoService.calcularInterventionGroup(this.dados),
        requestComparativeGroup:  this.DataLancamentoService.calcularComparativeGroup(this.dados)
      })
      .subscribe(({requestInterventionGroup, requestComparativeGroup}) => {
        this.dados.resultadoIntervencao = requestInterventionGroup;
        this.dados.resultadoComparativo = requestComparativeGroup;
        this.DataLancamentoService.addLancamento(this.dados);
        this.router.navigateByUrl(`/home/resultado?rInt=${requestInterventionGroup}&rComp=${requestComparativeGroup}`, { replaceUrl: true });
      });
    }
  }
  
  validarDados() : boolean{
    if(this.paciente == ""){
      this.showAlert("Fill in the field 'Patient'!");
      return false;
    }else if (this.coren == ""){
      this.showAlert("Fill in the field 'Coren'!");
      return false;
    }else if(this.idade == 0){
      this.showAlert("Fill in the field 'Age'!");
      return false;
    }else if (this.altura == 0){
      this.showAlert("Fill in the field 'Height'!");
      return false;
    }else if (this.peso == 0){
      this.showAlert("Fill in the field 'Weight'!");
      return false;
    }else if (this.triglicerideos == -174){
      this.showAlert("Fill in the field 'Triglycerides'!");
      return false;
    }else if (this.tempoEvolutivo == -15){
      this.showAlert("Fill in the field 'Evolutionary time'!");
      return false;
    }else if (this.circunferenciaAbdominal == 45){
      this.showAlert("Fill in the field 'Abdominal circumference'!");
      return false;
    }else if (this.renda == -400){
      this.showAlert("Fill in the field 'Income'!");
      return false;
    }else if (this.escolaridade == -8){
      this.showAlert("Fill in the field 'Schooling'!");
      return false;
    }
    
    return true;
  }

  buscarUltimoLancamento(paciente){
    this.DataLancamentoService.getLancamentosByIdPaciente(paciente).subscribe(res => {
 
      if(res.length > 0){
        this.listaDadosPaciente = res;
        
        this.dadosPaciente = this.listaDadosPaciente[0];

        this.data = this.dadosPaciente.data;
        this.idPaciente = this.dadosPaciente.idPaciente;
        this.coren = this.dadosPaciente.coren;
        this.idade = this.dadosPaciente.idade;
        this.altura = this.dadosPaciente.altura;
        this.peso = this.dadosPaciente.peso;
        this.triglicerideos = this.dadosPaciente.triglicerideos;
        this.tempoEvolutivo = this.dadosPaciente.tempoEvolutivo;
        this.circunferenciaAbdominal = this.dadosPaciente.circunferenciaAbdominal;
        this.renda = this.dadosPaciente.renda;
        this.escolaridade = this.dadosPaciente.escolaridade;
        this.resultadoIntervencao = this.dadosPaciente.resultadoIntervencao;
        this.resultadoComparativo = this.dadosPaciente.resultadoComparativo;

        this.cd.detectChanges();

      } else{
        this.dadosPaciente = {
          data : "",
          idPaciente: "",
          coren: "",
          idade: 0,
          altura:  0,
          peso:  0,
          triglicerideos: 0,
          tempoEvolutivo: 0,
          circunferenciaAbdominal: 0,
          renda: 0,
          escolaridade: 0,
          resultadoIntervencao: 0,
          resultadoComparativo: 0
        }

       this.limparDados();
      }
    });
  }

  limparDados(){
    this.data = "";
    this.idPaciente = "";
    this.coren = "";
    this.idade = 0;
    this.altura = 0;
    this.peso = 0;
    this.triglicerideos = -174;
    this.tempoEvolutivo = -15;
    this.circunferenciaAbdominal = 45;
    this.renda = -400;
    this.escolaridade = -8;
    this.resultadoIntervencao = 0;
    this.resultadoComparativo = 0;
  }
  
  async showAlert(message) {
    const alert = await this.alertController.create({
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}