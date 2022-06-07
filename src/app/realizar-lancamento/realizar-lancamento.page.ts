import { AlertController} from '@ionic/angular';
import { DataLancamentoService, Dados } from '../services/data-lancamento.service';
import { DataPacienteService, Paciente } from '../services/data-paciente.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-realizar-lancamento',
  templateUrl: './realizar-lancamento.page.html',
  styleUrls: ['./realizar-lancamento.page.scss'],
})
export class RealizarLancamentoPage implements OnInit {
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
    triglicerideos: 0,
    tempoEvolutivo: 0,
    circunferenciaAbdominal: 0,
    renda: 0,
    escolaridade: 0,
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
    var dataAtual = new Date();
    var dia = dataAtual.getDate();
    var mes =  parseInt(dataAtual.getMonth().toString()) + 1;
    var ano = dataAtual.getFullYear();
    this.data = dia + "/" + mes + "/" + ano;
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
      
      this.DataLancamentoService.calcularInterventionGroup(this.dados).subscribe(result =>
        this.showAlert("Seu risco comparativo é: " + result)
      );
          
      this.DataLancamentoService.calcularComparativeGroup(this.dados).subscribe(result =>
        this.showAlert("Seu risco comparativo é: " + result)
      );
  
      this.DataLancamentoService.addLancamento(this.dados);
      this.router.navigateByUrl('/home/resultado', { replaceUrl: true });
      
    }
  }
  
  validarDados() : boolean{
    if(this.paciente === ""){
      this.showAlert("Preencha o campo Paciente!");
      return false;
    }else if (typeof this.coren === "undefined"){
      this.showAlert("Preencha o campo Coren!");
      return false;
    }else if(typeof this.idade === "undefined"){
      this.showAlert("Preencha o campo Idade!");
      return false;
    }else if (typeof this.altura === "undefined"){
      this.showAlert("Preencha o campo Altura!");
      return false;
    }else if (typeof this.peso === "undefined"){
      this.showAlert("Preencha o campo Peso!");
      return false;
    }else if (typeof this.triglicerideos === "undefined"){
      this.showAlert("Preencha o campo Triglicerideos!");
      return false;
    }else if (typeof this.tempoEvolutivo === "undefined"){
      this.showAlert("Preencha o campo Tempo Evolutivo!");
      return false;
    }else if (typeof this.circunferenciaAbdominal === "undefined"){
      this.showAlert("Preencha o campo Circunferência Abdominal!");
      return false;
    }else if (typeof this.renda === "undefined"){
      this.showAlert("Preencha o campo Renda!");
      return false;
    }else if (typeof this.escolaridade === "undefined"){
      this.showAlert("Preencha o campo Escolaridade!");
      return false;
    }
    
    return true;
  }

  buscarUltimoLancamento(paciente){
    this.DataLancamentoService.getLancamentosByIdPaciente(paciente).subscribe(res => {
      this.listaDadosPaciente = res;

      var dataAtual = new Date();
      var dia = dataAtual.getDate();
      var mes =  parseInt(dataAtual.getMonth().toString()) + 1;
      var ano = dataAtual.getFullYear();
      var data = dia + "/" + mes + "/" + ano;

      for (let x of this.listaDadosPaciente) {
        var result;
        if (x.data == data) {
          result = x;
        }

        this.dadosPaciente = result;
        this.data = result.data;
        this.idPaciente = result.idPaciente;
        this.coren = result.coren;
        this.idade = result.idade;
        this.altura = result.altura;
        this.peso = result.peso;
        this.triglicerideos = result.triglicerideos;
        this.tempoEvolutivo = result.tempoEvolutivo;
        this.circunferenciaAbdominal = result.circunferenciaAbdominal;
        this.renda = result.renda;
        this.escolaridade = result.escolaridade;
        this.resultadoIntervencao = result.resultadoIntervencao;
        this.resultadoComparativo = result.resultadoComparativo;
      }

      this.cd.detectChanges();
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