import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
import { MoedaPipe } from '../pipes/moeda.pipe';

const CRIAR_ITEM = (nome: string, preco: number, categoria: CategoriaCardapio): ItemCardapio => ({
  nome,
  preco,
  categoria,
  inicial: nome.trim().charAt(0).toUpperCase(),
});

@Component({
  selector: 'app-cardapio',
  templateUrl: 'cardapio.page.html',
  styleUrls: ['cardapio.page.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MoedaPipe,
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

  cardapio: ItemCardapio[] = [
    // Salgados
    CRIAR_ITEM('Coxinha', 6.00, 'salgado'),
    CRIAR_ITEM('Enroladinho de Salsicha', 6.00, 'salgado'),
    CRIAR_ITEM('X-Gordelícia', 6.67, 'salgado'),

    // Bebidas
    CRIAR_ITEM('Suco', 5.00, 'bebida'),
    CRIAR_ITEM('Coca-Cola', 6.00, 'bebida'),
    CRIAR_ITEM('Fanta', 5.50, 'bebida'),

    // Doces
    CRIAR_ITEM('Bala', 0.50, 'doce'),
    CRIAR_ITEM('Pirulito', 1.00, 'doce'),
  ];

  filtro: 'todos' | CategoriaCardapio = 'todos';

  itensFiltrados: ItemCardapio[] = this.cardapio;

  readonly rotulos: Record<CategoriaCardapio, string> = {
    salgado: 'Salgado',
    bebida: 'Bebida',
    doce: 'Doce',
  };

  mudarFiltro(evento: CustomEvent) {
    const valor = evento.detail.value as 'todos' | CategoriaCardapio;
    this.filtro = valor;
    this.itensFiltrados =
      valor === 'todos'
        ? this.cardapio
        : this.cardapio.filter((item) => item.categoria === valor);
  }

  colocarNaComanda(item: ItemCardapio) {
    this.comanda.adicionar(item);
  }

}
