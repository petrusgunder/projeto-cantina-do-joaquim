import { Injectable, NgZone, inject } from '@angular/core';
import {
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import { auth } from '../firebase.config';

@Injectable({ providedIn: 'root' })
export class AuthService {

  usuario: User | null = null;
  pronto = false;

  private ngZone = inject(NgZone);

  constructor() {
    onAuthStateChanged(auth, (user) => {
      this.ngZone.run(() => {
        this.usuario = user;
        this.pronto = true;
      });
    });
  }

  esperarUsuario(): Promise<User | null> {
    if (this.pronto) {
      return Promise.resolve(this.usuario);
    }

    return new Promise((resolve) => {
      const cancelar = onAuthStateChanged(auth, (user) => {
        cancelar();
        this.ngZone.run(() => {
          this.usuario = user;
          this.pronto = true;
          resolve(user);
        });
      });
    });
  }

  aguardarSessao(): Promise<User> {
    return new Promise((resolve) => {
      if (this.usuario) {
        resolve(this.usuario);
        return;
      }

      const cancelar = onAuthStateChanged(auth, (user) => {
        if (!user) {
          return;
        }
        cancelar();
        this.ngZone.run(() => {
          this.usuario = user;
          this.pronto = true;
          resolve(user);
        });
      });
    });
  }

  // Define se o login fica salvo após fechar o app/navegador
  async definirPersistencia(manterConectado: boolean) {
    const tipo = manterConectado
      ? browserLocalPersistence
      : browserSessionPersistence;
    await setPersistence(auth, tipo);
  }

  async cadastrar(email: string, senha: string) {
    await this.definirPersistencia(true);
    return createUserWithEmailAndPassword(auth, email, senha);
  }

  async login(email: string, senha: string, manterConectado = true) {
    await this.definirPersistencia(manterConectado);
    return signInWithEmailAndPassword(auth, email, senha);
  }

  async loginComGoogle(manterConectado = true) {
    await this.definirPersistencia(manterConectado);
    const provedor = new GoogleAuthProvider();
    return signInWithPopup(auth, provedor);
  }

  sair() {
    return signOut(auth);
  }

  traduzirErro(codigo: string): string {
    switch (codigo) {
      case 'auth/email-already-in-use':
        return 'Este e-mail já está cadastrado.';
      case 'auth/invalid-email':
        return 'Digite um e-mail válido.';
      case 'auth/weak-password':
        return 'A senha precisa ter pelo menos 6 caracteres.';
      case 'auth/invalid-credential':
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return 'E-mail ou senha incorretos.';
      case 'auth/popup-closed-by-user':
      case 'auth/cancelled-popup-request':
        return 'Login cancelado.';
      case 'auth/popup-blocked':
        return 'O navegador bloqueou a janela. Libere o popup e tente de novo.';
      case 'auth/account-exists-with-different-credential':
        return 'Este e-mail já foi cadastrado com senha. Entre com e-mail e senha.';
      case 'auth/unauthorized-domain':
        return 'Este endereço não está autorizado no Firebase.';
      default:
        return 'Não foi possível concluir. Tente de novo.';
    }
  }

}