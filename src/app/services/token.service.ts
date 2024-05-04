import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private tokenSubject = new BehaviorSubject<string>('');

  setToken(token: string) {
    this.tokenSubject.next(token);
  }

  getToken(): Observable<string> {
    return this.tokenSubject.asObservable();
  }
}
