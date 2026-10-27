import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonBadge,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { searchOutline, alertCircleOutline, logOutOutline } from 'ionicons/icons';
import { ComandaService } from '../services/comandaService';
import { AuthService } from '../services/authService';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
    IonBadge,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
  ],
})
export class TabsPage {
  comanda = inject(ComandaService);
  private auth = inject(AuthService);
  private router = inject(Router);

  constructor() {
    addIcons({ searchOutline, alertCircleOutline, logOutOutline });
  }

  async logout() {
    await this.auth.sair();
    this.router.navigate(['/login']);
  }
}
