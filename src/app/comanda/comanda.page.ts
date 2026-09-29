import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonButton,
  IonContent,
  IonFooter,
  IonToolbar,
} from '@ionic/angular';
import { ComandaService } from '../services/comandaService';

@Component({
  selector: 'app-comanda',
  templateUrl: 'comanda.page.html',
  styleUrls: ['comanda.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonFooter,
    IonToolbar,
    IonButton,
  ],
})
export class ComandaPage {

  comanda = inject(ComandaService);
  private router = inject(Router);

  alterarQuantidade(index: number, diferenca: number) {
    this.comanda.alterarQuantidade(index, diferenca);
  }

  irParaPagamento() {
    if (this.comanda.itens.length === 0) {
      return;
    }
    this.router.navigate(['/pagamento']);
  }

}
