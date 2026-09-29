import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
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
import { MoedaPipe } from '../pipes/moeda.pipe';

const PEDIDO_MINIMO = 25;

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.page.html',
  styleUrls: ['./pagamento.page.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MoedaPipe,
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

  readonly minimo = PEDIDO_MINIMO;
  readonly minimoTexto = PEDIDO_MINIMO.toFixed(2);
  pagamentoConfirmado = false;

  // computados: só recalculam quando o total da comanda muda
  readonly podePagar = computed(() => this.comanda.total() >= this.minimo);

  readonly faltaParaMinimo = computed(() =>
    Math.max(this.minimo - this.comanda.total(), 0)
  );

  readonly faltaTexto = computed(() => this.faltaParaMinimo().toFixed(2));

  confirmarPagamento() {
    if (!this.podePagar()) {
      return;
    }
    this.pagamentoConfirmado = true;
    this.comanda.limpar();
  }

  voltarCardapio() {
    this.router.navigate(['/tabs/cardapio']);
  }

}
