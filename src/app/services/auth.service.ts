import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(this.loadUserFromStorage());
  public user$ = this.userSubject.asObservable();

  constructor() {}

  private loadUserFromStorage(): User | null {
    const userJSON = localStorage.getItem('user');
    return userJSON ? JSON.parse(userJSON) : null;
  }

  login(email: string, password: string): Observable<any> {
    // Esta é uma implementação mockada. Substitua com sua lógica real de autenticação
    const mockUser: User = {
      id: '1',
      email: email,
      name: 'User Name'
    };
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('token', 'mock-token-' + Date.now());
    this.userSubject.next(mockUser);
    return new Observable(observer => observer.next(mockUser));
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.userSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getUser(): User | null {
    return this.userSubject.value;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}

export const AuthProvider = [];
