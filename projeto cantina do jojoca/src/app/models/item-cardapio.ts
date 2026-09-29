export type CategoriaCardapio = 'salgado' | 'bebida' | 'doce';

export interface ItemCardapio {
  nome: string;
  preco: number;
  categoria: CategoriaCardapio;
  inicial: string;
}
