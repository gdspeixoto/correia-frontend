import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginDto } from 'src/app/models/LoginDto';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  public date: Date;
  public year: number;
  public LoginForm: FormGroup;
  public msgErro: string;
  public loadingData: boolean;
  public esconderForm: boolean = false;
  public hide = true;
  public spinner: boolean;

  constructor(private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService) {
    this.date = new Date;
    this.year = this.date.getFullYear();
  }

  async ngOnInit(): Promise<void> {
    this.LoginForm = new FormGroup({
      "email": new FormControl("", [Validators.required, Validators.email]),
      "password": new FormControl("", [Validators.required])
    });
  }

  //Validação do e-mail
  public EmailInvalid(): string {
    if (this.LoginForm.getError("required", "email") && this.LoginForm.get("email").touched) {
      return "Preencha o e-mail";
    } else if (this.LoginForm.getError("email", "email") && this.LoginForm.get("email").touched) {
      return "E-mail inválido, tente novamente";
    } else {
      var regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
      if (!regex.test(this.LoginForm.value.email) && this.LoginForm.get("email").touched) {
        return "E-mail inválido, tente novamente";
      }
    }
    return null;
  }

  //Validação da senha
  public PasswordInvalid(): string {
    if (this.LoginForm.getError("required", "password") && this.LoginForm.get("password").touched) {
      return "Preencha a senha";
    }
    return null;
  }

  telaLogin() {
    this.esconderForm = !this.esconderForm;
  }

  public async Login() {
    let loginDto: LoginDto = new LoginDto();
    loginDto.Username = this.LoginForm.value.email;
    loginDto.Password = this.LoginForm.value.password;
    this.loadingData = true;

    setTimeout(() => {

      this.loginService.AutenticationUser(loginDto)
        .then(result => {

          if (result) {
            sessionStorage.setItem("userToken", result.token);
            sessionStorage.setItem("user", btoa(JSON.stringify(result.user)));
            setTimeout(() => {
              this.router.navigate(['']);
            }, 2000);
            this.toastr.success("Redirecionando...", "Login realizado com sucesso!");
          } else {
            this.loadingData = false;
          }
        })
        .catch(error => {
          this.toastr.error("Ocorreu um erro: " + error, "Error");
        });

    }, 3000);
  }

  public async EsqueciSenha() {
    let loginDto: LoginDto = new LoginDto();
    loginDto.Username = this.LoginForm.value.email;

    this.esconderForm = true;

    this.loginService.EsqueceuSenha(loginDto)
      .then(result => {

        if (result) {
          this.toastr.success(result.message);
          this.esconderForm = false;
        }
        else {
          this.esconderForm = true;
        }
      })
      .catch(error => {
        this.toastr.error("Ocorreu um erro: " + error, "Error");
      });
  }
}
