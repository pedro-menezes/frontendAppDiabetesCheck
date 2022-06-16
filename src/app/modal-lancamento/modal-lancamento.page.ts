import { Dados, DataLancamentoService } from '../services/data-lancamento.service';
import { Component, Input, OnInit, ChangeDetectorRef} from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FieldValue, serverTimestamp, Timestamp } from 'firebase/firestore'; 

@Component({
  selector: 'app-modal-lancamento',
  templateUrl: './modal-lancamento.page.html',
  styleUrls: ['./modal-lancamento.page.scss'],
})
export class ModalLancamentoPage implements OnInit {
  @Input() id: string;

  lancamento: Dados = {
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
    await this.dataLancamentoService.updateLancamento(this.lancamento);
    const toast = await this.toastCtrl.create({
      message: 'Dados atualizados com sucesso!',
      duration: 2000
    });
    toast.present();
    this.modalCtrl.dismiss();
  } 
}