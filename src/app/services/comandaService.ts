import { Injectable } from '@angular/core';
import { ItemCardapio } from '../models/item-cardapio';
import { ItemComanda } from '../models/item-comanda';

@Injectable({ providedIn: 'root' })
export class ComandaService {

  itens: ItemComanda[] = [];

  // adiciona 1 unidade do item; se já existir na comanda, só aumenta a quantidade
  adicionar(item: ItemCardapio) {
    const existente = this.itens.find((i) => i.nome === item.nome);
    if (existente) {
      existente.quantidade++;
    } else {
      this.itens.push({ nome: item.nome, preco: item.preco, quantidade: 1, foto: item.foto });
    }
  }

  // soma ou subtrai da quantidade (+1, +2, -1, -2...); remove o item se zerar
  alterarQuantidade(index: number, diferenca: number) {
    const item = this.itens[index];
    if (!item) {
      return;
    }

    item.quantidade += diferenca;

    if (item.quantidade <= 0) {
      this.itens.splice(index, 1);
    }
  }

  remover(index: number) {
    this.itens.splice(index, 1);
  }

  get total(): number {
    return this.itens.reduce((soma, item) => soma + item.preco * item.quantidade, 0);
  }

  limpar() {
    this.itens = [];
  }

}
