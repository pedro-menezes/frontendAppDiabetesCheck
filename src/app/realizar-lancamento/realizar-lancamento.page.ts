import { AlertController} from '@ionic/angular';
import { DataLancamentoService, Dados } from '../services/data-lancamento.service';
import { DataPacienteService, Paciente } from '../services/data-paciente.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

    /*//ForkJoin
      Observable.forkJoin(
        this.DataLancamentoService.calcularInterventionGroup(this.dados),
        this.DataLancamentoService.calcularComparativeGroup(this.dados)
      ).subscribe((([resultIntervention, resultComparative]: [number, number]) => {
          this.dados.resultadoIntervencao = resultIntervention;
          this.dados.resultadoComparativo = resultComparative;
      }));

    //CombineLatesWith
      const name$ = this.DataLancamentoService.calcularInterventionGroup(this.dados)
      const document$ = this.DataLancamentoService.calcularComparativeGroup(this.dados)
 
      name$.pipe(
              combineLatestWith(document$)
            )
            .subscribe(([name, document]) => {
                this.dados.resultadoIntervencao = name;
                this.resultadoComparativo = pair.document;
                //this.showForm();
            }) */
      

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