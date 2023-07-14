import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private toaster: ToastrService
  ) {}

  canActivate(): boolean {
    if (sessionStorage.getItem('userToken') !== null)
      return true;
    //this.toaster.info('Usuário não autenticado!');
    this.router.navigate(['login']);
    return false;
  }

}
