import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonBadge,
} from '@ionic/angular';
import { ItemCardapio, CategoriaCardapio } from '../models/item-cardapio';
import { ComandaService } from '../services/comandaService';

@Component({
  selector: 'app-cardapio',
  templateUrl: 'cardapio.page.html',
  styleUrls: ['cardapio.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonCard,
    IonCardContent,
    IonButton,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonBadge,
  ],
})
export class CardapioPage {

  comanda = inject(ComandaService);

  // filtro ativo do segmento: todos | bebida | comida
  filtro: 'todos' | CategoriaCardapio = 'todos';

  // cardápio fixo da cantina
  cardapio: ItemCardapio[] = [
    { nome: 'Coxinha', preco: 6, categoria: 'comida', foto: 'https://placehold.co/300x300/f97316/ffffff?text=Coxinha' },
    { nome: 'Suco', preco: 5, categoria: 'bebida', foto: 'https://placehold.co/300x300/0ea5e9/ffffff?text=Suco' },
    { nome: 'Refri', preco: 5, categoria: 'bebida', foto: 'https://placehold.co/300x300/0ea5e9/ffffff?text=Refri' },
    { nome: 'Empada', preco: 6, categoria: 'comida', foto: 'https://placehold.co/300x300/f97316/ffffff?text=Empada' },
    { nome: 'Bala de café', preco: 1, categoria: 'comida', foto: 'https://placehold.co/300x300/f97316/ffffff?text=Bala' },
  ];

  get itensFiltrados(): ItemCardapio[] {
    if (this.filtro === 'todos') {
      return this.cardapio;
    }
    return this.cardapio.filter((item) => item.categoria === this.filtro);
  }

  mudarFiltro(evento: any) {
    this.filtro = evento.detail.value;
  }

  rotuloCategoria(categoria: CategoriaCardapio): string {
    return categoria === 'bebida' ? 'Bebida' : 'Comida';
  }

  colocarNaComanda(item: ItemCardapio) {
    this.comanda.adicionar(item);
  }

}
