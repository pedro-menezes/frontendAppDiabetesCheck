import { Dados, DataLancamentoService } from '../services/data-lancamento.service';
import { Component, Input, OnInit, ChangeDetectorRef} from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modal-lancamento',
  templateUrl: './modal-lancamento.page.html',
  styleUrls: ['./modal-lancamento.page.scss'],
})
export class ModalLancamentoPage implements OnInit {
  @Input() id: string;

  lancamento: Dados = null;
  dataAtual: string = "";

  constructor(
    private dataLancamentoService: DataLancamentoService, 
    private modalCtrl: ModalController, 
    private toastCtrl: ToastController,
    private cd: ChangeDetectorRef,
  ) 
  { }
 
  ngOnInit() {
    this.dataLancamentoService.getLancamentoById(this.id).subscribe(res => {
      this.lancamento = res;
    }); 

    var data = new Date();
    var dia = data.getDate();
    var mes =  parseInt(data.getMonth().toString()) + 1;
    var ano = data.getFullYear();
    this.dataAtual = dia + "/" + mes + "/" + ano;
  }

  async deletarLancamento() {
    await this.dataLancamentoService.deleteLancamento(this.lancamento);
    const toast = await this.toastCtrl.create({
      message: 'Exclusão realizada com sucesso!',
      duration: 2000
    });
    toast.present();
    this.modalCtrl.dismiss();
  }
 
  async atualizarLancamento() {
    this.lancamento.data = this.dataAtual;
    await this.dataLancamentoService.updateLancamento(this.lancamento);
    const toast = await this.toastCtrl.create({
      message: 'Dados atualizados com sucesso!',
      duration: 2000
    });
    toast.present();
    this.modalCtrl.dismiss();
  } 
}