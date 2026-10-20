import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonCard,
  IonCardContent,
} from '@ionic/angular';

@Component({
  selector: 'app-pagamento',
  templateUrl: 'pagamento.page.html',
  styleUrls: ['pagamento.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonCard,
    IonCardContent,
  ],
})
export class PagamentoPage {
  private router = inject(Router);

  voltarInicio() {
    this.router.navigate(['/tabs/cardapio']);
  }
}
