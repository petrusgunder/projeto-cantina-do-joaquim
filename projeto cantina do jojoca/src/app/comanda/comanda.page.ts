import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonFooter,
  IonToolbar,
  IonSegment,
  IonSegmentButton,
  IonLabel,
} from '@ionic/angular';
import { ComandaService } from '../services/comandaService';
import { MoedaPipe } from '../pipes/moeda.pipe';

@Component({
  selector: 'app-comanda',
  templateUrl: 'comanda.page.html',
  styleUrls: ['comanda.page.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MoedaPipe,
    IonContent,
    IonCard,
    IonCardContent,
    IonFooter,
    IonToolbar,
    IonButton,
    IonSegment,
    IonSegmentButton,
    IonLabel,
  ],
})
export class ComandaPage {

  comanda = inject(ComandaService);
  private router = inject(Router);

  porcentagemGorjeta = 10;

  get valorGorjeta(): number {
    return (this.comanda.total() * this.porcentagemGorjeta) / 100;
  }

  get totalComGorjeta(): number {
    return this.comanda.total() + this.valorGorjeta;
  }

  alterarQuantidade(index: number, diferenca: number) {
    this.comanda.alterarQuantidade(index, diferenca);
  }

  removerItem(index: number) {
    const item = this.comanda.itens()[index];
    if (item) {
      this.comanda.alterarQuantidade(index, -item.quantidade);
    }
  }

  selecionarGorjeta(evento: CustomEvent) {
    this.porcentagemGorjeta = Number(evento.detail.value) || 0;
  }

  irParaPagamento() {
    if (this.comanda.itens().length === 0) {
      return;
    }
    this.router.navigate(['/pagamento']);
  }

}
