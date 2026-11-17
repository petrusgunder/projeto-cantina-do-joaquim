import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/authService';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCheckbox,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonContent,
    IonCard,
    IonCardContent,
    IonCheckbox,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
  ],
})
export class LoginPage implements OnInit {

  email = '';
  senha = '';
  manterConectado = true;
  mensagemErro = '';

  private auth = inject(AuthService);
  private router = inject(Router);

  async ngOnInit() {
    // Se já houver sessão salva no dispositivo/navegador, pula o login
    const user = await this.auth.esperarUsuario();
    if (user) {
      this.router.navigate(['/tabs/cardapio'], { replaceUrl: true });
    }
  }

  async login() {
    this.mensagemErro = '';

    if (!this.email || !this.senha) {
      this.mensagemErro = 'Preencha e-mail e senha.';
      return;
    }

    try {
      await this.auth.login(this.email, this.senha, this.manterConectado);
      await this.auth.aguardarSessao();
      this.router.navigate(['/tabs/cardapio'], { replaceUrl: true });
    } catch (e: any) {
      this.mensagemErro = this.auth.traduzirErro(e.code);
      this.senha = '';
    }
  }

  async loginGoogle() {
    this.mensagemErro = '';

    try {
      await this.auth.loginComGoogle(this.manterConectado);
      await this.auth.aguardarSessao();
      this.router.navigate(['/tabs/cardapio'], { replaceUrl: true });
    } catch (e: any) {
      this.mensagemErro = this.auth.traduzirErro(e.code);
    }
  }

}