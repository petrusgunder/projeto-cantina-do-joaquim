import { Pipe, PipeTransform } from '@angular/core';

/** Pipe puro: formata número como moeda BRL com cache automático por valor,
 *  evitando chamadas repetidas de toFixed() a cada ciclo de detecção. */
@Pipe({
  name: 'moeda',
  standalone: true,
  pure: true,
})
export class MoedaPipe implements PipeTransform {

  transform(valor: number | null | undefined): string {
    if (valor == null || Number.isNaN(valor)) {
      return 'R$ 0.00';
    }
    return `R$ ${valor.toFixed(2)}`;
  }

}
