export type CategoriaCardapio = 'bebida' | 'comida';

export interface ItemCardapio {
  nome: string;
  preco: number;
  categoria: CategoriaCardapio;
  foto: string;
}
