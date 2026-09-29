import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { restaurantOutline, receiptOutline } from 'ionicons/icons';
import {
  IonBadge,
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
  ViewWillEnter,
} from '@ionic/angular';
import { AuthService } from '../services/authService';
import { ComandaService } from '../services/comandaService';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
    IonBadge,
  ],
})
export class TabsPage implements ViewWillEnter {

  auth = inject(AuthService);
  comanda = inject(ComandaService);
  private router = inject(Router);

  constructor() {
    addIcons({ restaurantOutline, receiptOutline });
  }

  // roda toda vez que a página é aberta — inclusive ao trocar de conta
  async ionViewWillEnter() {
    const usuario = await this.auth.esperarUsuario();
    if (!usuario) {
      this.router.navigate(['/login']);
    }
  }

  async sair() {
    await this.auth.sair();
    this.router.navigate(['/login']);
  }

}
