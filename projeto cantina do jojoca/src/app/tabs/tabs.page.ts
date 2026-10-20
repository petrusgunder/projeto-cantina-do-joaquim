import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonBadge,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { searchOutline, alertCircleOutline } from 'ionicons/icons';
import { ComandaService } from '../services/comandaService';

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
  ],
})
export class TabsPage {
  comanda = inject(ComandaService);

  constructor() {
    addIcons({ searchOutline, alertCircleOutline });
  }
}
