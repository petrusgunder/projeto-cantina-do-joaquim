import { Injectable, computed, signal } from '@angular/core';
import { ItemCardapio } from '../models/item-cardapio';
import { ItemComanda } from '../models/item-comanda';

/**
 * Estado da comanda com Angular Signals:
 * - getters e mutações de array são substituídos por `signal` + `computed`,
 *   que só recalculam quando os dados mudam de fato (e não a cada ciclo
 *   de detecção de mudanças), eliminando trabalho redundante na UI Thread.
 */
@Injectable({ providedIn: 'root' })
export class ComandaService {

  readonly itens = signal<ItemComanda[]>([]);

  /** quantidade total de unidades (soma das quantidades) */
  readonly quantidadeItens = computed(() =>
    this.itens().reduce((soma, item) => soma + item.quantidade, 0)
  );

  /** valor total da comanda */
  readonly total = computed(() =>
    this.itens().reduce((soma, item) => soma + item.preco * item.quantidade, 0)
  );

  // adiciona 1 unidade do item; se já existir na comanda, só aumenta a quantidade
  adicionar(item: ItemCardapio) {
    this.itens.update((itens) => {
      const existente = itens.some((i) => i.nome === item.nome);
      if (existente) {
        return itens.map((i) =>
          i.nome === item.nome ? { ...i, quantidade: i.quantidade + 1 } : i
        );
      }
      return [...itens, { nome: item.nome, preco: item.preco, quantidade: 1, inicial: item.inicial }];
    });
  }

  // soma ou subtrai da quantidade (+1, -1...); remove o item se zerar
  alterarQuantidade(index: number, diferenca: number) {
    this.itens.update((itens) => {
      const item = itens[index];
      if (!item) {
        return itens;
      }
      const novaQuantidade = item.quantidade + diferenca;
      if (novaQuantidade <= 0) {
        return itens.filter((_, i) => i !== index);
      }
      return itens.map((i, iIndex) =>
        iIndex === index ? { ...i, quantidade: novaQuantidade } : i
      );
    });
  }

  remover(index: number) {
    this.itens.update((itens) => itens.filter((_, i) => i !== index));
  }

  limpar() {
    this.itens.set([]);
  }

}
