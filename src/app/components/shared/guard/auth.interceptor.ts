import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { catchError, EMPTY, Observable, switchMap, take, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  router: any;
  constructor(private loginService: LoginService, private toastr: ToastrService,) { }

  async Redirecionamento(){
    this.loginService.LogoutUser();
    window.location.reload();
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.loginService.getAuthorizationToken();

    if (token) {
      // If we have a token, we set it to the header
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.toastr.error("Por gentileza, efetue o login novamente", "Sessão encerrada");
            setTimeout(() => {
              this.loginService.LogoutUser();
              window.location.reload();
            }, 1000)
          } else if (err.status === 400) {
            this.toastr.error("Verifique suas credenciais", "Erro");
          } else if(err.status === 0){
            this.toastr.error("Por favor, tente novamente mais tarde ou entre em contato com o suporte técnico caso o problema persista.", "Desculpe, ocorreu um erro ao processar sua solicitação.");
          } else if(err.status == 403){
            this.toastr.warning("Você não tem acesso suficiente para acessar essa página", "Alerta");
            this.toastr.info("Redirecionando para inicio.");
            setTimeout(() => {
              this.router.navigation(['/inicio']);
            }, 1000);
          } else if(err.status == 500){
            this.toastr.error(`${err.error}`, "Erro");
          }else if(err.status == 404){
            this.toastr.error(`${err.error}`, "Erro");
          }
           else{
            this.toastr.error("Um erro inesperado ocorreu, tente novamente", "Erro");
          }
        }
        return EMPTY;
      })
    )
  }
}
