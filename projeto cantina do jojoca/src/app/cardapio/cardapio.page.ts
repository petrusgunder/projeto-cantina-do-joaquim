import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonItem,
  IonLabel,
  IonInput,
} from '@ionic/angular';
import { ComandaService, ItemSistema } from '../services/comandaService';

@Component({
  selector: 'app-cardapio',
  templateUrl: 'cardapio.page.html',
  styleUrls: ['cardapio.page.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonCard,
    IonCardContent,
    IonButton,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonItem,
    IonLabel,
    IonInput,
  ],
})
export class CardapioPage {
  readonly comanda = inject(ComandaService);

  isModalAberto = signal(false);
  novoNome = signal('');
  novoLocal = signal('');
  fotoBase64 = signal<string | undefined>(undefined);

  abrirModal() {
    this.novoNome.set('');
    this.novoLocal.set('');
    this.fotoBase64.set(undefined);
    this.isModalAberto.set(true);
  }

  fecharModal() {
    this.isModalAberto.set(false);
  }

  onFotoSelecionada(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.fotoBase64.set(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  async salvarItemAchado() {
    if (!this.novoNome() || !this.novoLocal()) return;

    await this.comanda.adicionarAchado(
      this.novoNome(),
      this.novoLocal(),
      this.fotoBase64()
    );

    this.fecharModal();
  }

  async marcarComoDevolvido(item: ItemSistema) {
    await this.comanda.removerAchado(item.id);
  }
}
