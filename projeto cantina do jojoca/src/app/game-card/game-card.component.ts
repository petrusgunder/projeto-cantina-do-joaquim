import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { IonButton } from '@ionic/angular';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
  imports: [IonButton],
})
export class GameCardComponent  implements OnInit {

  @Input() jogo: any;
  @Output() favoritar = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {}

  onFavoritar() {
    this.favoritar.emit(this.jogo.nome);
  }

}
