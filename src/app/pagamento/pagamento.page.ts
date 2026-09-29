import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';
import { ComandaService } from '../services/comandaService';

const PEDIDO_MINIMO = 25;

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.page.html',
  styleUrls: ['./pagamento.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
  ],
})
export class PagamentoPage {

  comanda = inject(ComandaService);
  private router = inject(Router);

  minimo = PEDIDO_MINIMO;
  pagamentoConfirmado = false;

  // quanto falta para bater o pedido mínimo (0 se já bateu)
  get faltaParaMinimo(): number {
    return Math.max(this.minimo - this.comanda.total, 0);
  }

  // só pode pagar se a comanda tiver pelo menos o valor mínimo
  get podePagar(): boolean {
    return this.comanda.total >= this.minimo;
  }

  confirmarPagamento() {
    if (!this.podePagar) {
      return;
    }
    this.pagamentoConfirmado = true;
    this.comanda.limpar();
  }

  voltarCardapio() {
    this.router.navigate(['/tabs/cardapio']);
  }

}
