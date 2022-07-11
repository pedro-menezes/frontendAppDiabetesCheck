import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Dados, DataLancamentoService } from '../services/data-lancamento.service';
import { DataPacienteService } from '../services/data-paciente.service';
import { DataPessoaService, Pessoa } from '../services/data-pessoa.service';

@Component({
  selector: 'app-relatorio-por-data',
  templateUrl: './relatorio-por-data.page.html',
  styleUrls: ['./relatorio-por-data.page.scss'],
})
export class RelatorioPorDataPage implements OnInit {
  enfermeiro: Pessoa;
  enfermeiros: Pessoa[] = [];
  dataInicio: string;
  dataFim: string;
  result: Dados[] = [];
  lancamentos: Dados[] = [];
  l: Dados;
  idsPacientes: string[] = [];
  nomesPacientes: string[] = [];

  constructor(
    private alertController: AlertController,
    private dataPessoaService: DataPessoaService,
    private dataPacienteService: DataPacienteService,
    private dataLancamentoService: DataLancamentoService,
    private cd: ChangeDetectorRef
  ) { 
  this.dataPessoaService.getEnfermeiros().subscribe(res => {
    this.enfermeiros = res;
    this.cd.detectChanges();
  });
}

  ngOnInit() {
  }

  listarPacientes(){
    this.result = [];
    this.lancamentos = [];
    this.idsPacientes = [];
    this.nomesPacientes = [];

    var coren = this.enfermeiro.coren.toString();
    
    //Lista todos os lançamentos realizados por aquele enfermeiro
    this.dataLancamentoService.getLancamentosByCoren(coren).subscribe(res => {
      this.result = res;

      //Se existir pelo menos um lançamento
      if(res.length > 0){

        //Percorre todos os lançamentos e verifica se a data está no intervalo
        var i = 0;
        for(let l of this.result){
          var timestamp = Object.values(l.data);
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

          if(data >= this.dataInicio && data <= this.dataFim ){
            this.lancamentos[i] = l;
            i++;
          }
        }

        //Se estiver pelo menos uma data no intervalo
        if(this.lancamentos.length > 0){
          
          i = 0;
          //Armazena os ids dos pacientes desses lançamentos válidos
          for(let m of this.lancamentos){
            this.idsPacientes[i] = m.idPaciente;
            i++;
          }
       
          i = 0;
          //Armazena os nomes dos pacientes, buscando por id
          for(let n of this.idsPacientes){
            this.dataPacienteService.getPacienteById(n).subscribe(res => {
              this.nomesPacientes[i] = res.nome;
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
