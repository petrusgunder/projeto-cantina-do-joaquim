import { ChangeDetectionStrategy, Component, ViewChild, inject, signal } from '@angular/core';
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
  @ViewChild(IonModal) modal?: IonModal;

  readonly comanda = inject(ComandaService);

  isModalAberto = signal(false);
  salvando = signal(false);
  novoNome = signal('');
  novoLocal = signal('');
  fotoBase64 = signal<string | undefined>(undefined);

  abrirModal() {
    this.novoNome.set('');
    this.novoLocal.set('');
    this.fotoBase64.set(undefined);
    this.isModalAberto.set(true);
  }

  async fecharModal() {
    this.isModalAberto.set(false);
    await this.modal?.dismiss();
  }

  aoFecharModal() {
    this.isModalAberto.set(false);
  }

  onFotoSelecionada(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const max = 800;
        const escala = Math.min(1, max / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width = img.width * escala;
        canvas.height = img.height * escala;
        canvas.getContext('2d')?.drawImage(img, 0, 0, canvas.width, canvas.height);
        this.fotoBase64.set(canvas.toDataURL('image/jpeg', 0.75));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  async salvarItemAchado() {
    const nome = this.novoNome().trim();
    const local = this.novoLocal().trim();
    if (!nome || !local || this.salvando()) return;

    this.salvando.set(true);
    try {
      await this.comanda.adicionarAchado(nome, local, this.fotoBase64());
      await this.fecharModal();
    } finally {
      this.salvando.set(false);
    }
  }

  async marcarComoDevolvido(item: ItemSistema) {
    await this.comanda.removerAchado(item.id);
  }
}