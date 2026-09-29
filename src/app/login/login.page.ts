import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/authService';
import { IonButton, IonCard, IonCardContent, IonContent, IonItem, IonLabel, IonInput } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [ CommonModule, FormsModule, RouterModule,IonContent,IonCard,IonCardContent,IonItem,IonLabel,IonInput,IonButton],
})
export class LoginPage {

  email = '';
  senha = '';
  mensagemErro = '';

  private auth = inject(AuthService);
  private router = inject(Router);

  async login() {
    this.mensagemErro = '';

    if (!this.email || !this.senha) {
      this.mensagemErro = 'Preencha e-mail e senha.';
      return;
    }

    try {
      await this.auth.login(this.email, this.senha);
      await this.auth.aguardarSessao();
      this.router.navigate(['/tabs/cardapio']);
    } catch (e: any) {
      this.mensagemErro = this.auth.traduzirErro(e.code);
      this.senha = '';
    }
  }

  async loginGoogle() {
    this.mensagemErro = '';

    try {
      await this.auth.loginComGoogle();
      await this.auth.aguardarSessao();
      this.router.navigate(['/tabs/cardapio']);
    } catch (e: any) {
      this.mensagemErro = this.auth.traduzirErro(e.code);
    }
  }

}
