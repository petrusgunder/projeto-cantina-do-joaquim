export interface ItemComanda {
  nome: string;
  preco: number;
  quantidade: number;
  /** letra do monograma (pré-calculada, sem método no template) */
  inicial: string;
}
