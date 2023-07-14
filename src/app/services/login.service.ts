import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginDto } from '../models/LoginDto';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = `${environment.baseUrl}`;
  }

  public async AutenticationUser(login: LoginDto) {
    const Response = await this.httpClient.post<any>(this.baseUrl + "UserAccount/login", login).toPromise();
    return Response;
  }

  public async EsqueceuSenha(login: LoginDto) {
    const Response = await this.httpClient.post<any>(this.baseUrl + "UserAccount/esqueci-minha-senha", login).toPromise();
    return Response;
  }

  getAuthorizationToken() {
    const token = window.sessionStorage.getItem('userToken');
    return token;
  }

  LogoutUser() {
    sessionStorage.clear();
  }

  getTokenExpirationDate(Response: string): Date {
    const decoded: any = jwt_decode(Response);

    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }

    return !(date.valueOf() > new Date().valueOf());
  }

  isUserLoggedIn() {
    const token = this.getAuthorizationToken();
    if (!token) {
      return false;
    } else if (this.isTokenExpired(token)) {
      return false;
    }

    return true;
  }

}
  function jwt_decode(token: string): any {
    throw new Error('Function not implemented.');
  }
