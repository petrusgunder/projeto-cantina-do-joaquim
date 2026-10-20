import { Injectable, signal } from '@angular/core';
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  serverTimestamp
} from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export interface ItemSistema {
  id: string;
  nome: string;
  local: string;
  userId: string;
  userName: string;
  fotoUrl?: string;
  status: 'perdido' | 'encontrado';
}

@Injectable({
  providedIn: 'root',
})
export class ComandaService {
  private db = getFirestore();
  private auth = getAuth();

  readonly itensAchados = signal<ItemSistema[]>([]);
  readonly itensPerdidos = signal<ItemSistema[]>([]);

  private unsubscribeAchados: (() => void) | null = null;
  private unsubscribePerdidos: (() => void) | null = null;

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.iniciarEscutaDados();
      } else {
        this.limparEscutas();
      }
    });
  }

  private iniciarEscutaDados() {
    this.limparEscutas();

    // 1. Consulta Global: Todos os itens achados
    const qAchados = query(
      collection(this.db, 'itens'),
      where('status', '==', 'encontrado')
    );
    this.unsubscribeAchados = onSnapshot(qAchados, (snapshot) => {
      const achados: ItemSistema[] = snapshot.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<ItemSistema, 'id'>),
      }));
      this.itensAchados.set(achados);
    });

    // 2. Consulta Compartilhada: Todos os itens perdidos de todos os usuários
    const qPerdidos = query(
      collection(this.db, 'itens'),
      where('status', '==', 'perdido')
    );
    this.unsubscribePerdidos = onSnapshot(qPerdidos, (snapshot) => {
      const perdidos: ItemSistema[] = snapshot.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<ItemSistema, 'id'>),
      }));
      this.itensPerdidos.set(perdidos);
    });
  }

  private limparEscutas() {
    if (this.unsubscribeAchados) this.unsubscribeAchados();
    if (this.unsubscribePerdidos) this.unsubscribePerdidos();
    this.itensAchados.set([]);
    this.itensPerdidos.set([]);
  }

  async adicionarPerdido(nome: string, local: string, fotoUrl?: string) {
    const user = this.auth.currentUser;
    if (!user) return;

    await addDoc(collection(this.db, 'itens'), {
      nome,
      local,
      userId: user.uid,
      userName: user.displayName || user.email || 'Usuário Anônimo',
      fotoUrl: fotoUrl || '',
      status: 'perdido',
      criadoEm: serverTimestamp(),
    });
  }

  async adicionarAchado(nome: string, local: string, fotoUrl?: string) {
    const user = this.auth.currentUser;
    if (!user) return;

    await addDoc(collection(this.db, 'itens'), {
      nome,
      local,
      userId: user.uid,
      userName: user.displayName || user.email || 'Usuário Anônimo',
      fotoUrl: fotoUrl || '',
      status: 'encontrado',
      criadoEm: serverTimestamp(),
    });
  }

  async marcarComoEncontrado(item: ItemSistema) {
    const itemRef = doc(this.db, 'itens', item.id);
    await updateDoc(itemRef, {
      status: 'encontrado',
    });
  }

  async removerAchado(id: string) {
    const itemRef = doc(this.db, 'itens', id);
    await deleteDoc(itemRef);
  }
}
