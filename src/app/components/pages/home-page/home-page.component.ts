import { Employee } from '../../../models/Employee';
import { Component, Input, OnInit, Output } from '@angular/core';
import { SidebarNavService } from '../../shared/sidebar-nav/sidebar-nav.service';
import Chart from 'chart.js/auto';
import { LoginDto } from 'src/app/models/LoginDto';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public chart: any;

  shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);
  public loja: string;
  public title: string;
  public labels: any[];
  public list_Produtos: any[];
  public vendas:number;

  public loginTeste: LoginDto[];

  constructor(public sidebarservice: SidebarNavService,
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService) {
    this.loja = 'Correia Material de Construção'
    this.title = 'Dashboard'

    this.loginTeste = [
      {Id: 1, Name: "Nome 1", Username: "gabriel.peixoto.ssa02@gmail.com", DtCreator: "2023-07-16", DtUpdate: "2023-07-16", Employee: null, Password: "senha1", Role: "Role 1", ViewConfidentialData: 1, Status: "Ativo", IdUserCreator: 1, DtExclusion: null, IdUserExclusion: null, IdUserUpdate: null},
      {Id: 2, Name: "Nome 2", Username: "gdspeixoto.ssa@outlook.com", DtCreator: "2023-07-16", DtUpdate: "2023-07-16", Employee: null, Password: "senha2", Role: "Role 2", ViewConfidentialData: 1, Status: "Ativo", IdUserCreator: 2, DtExclusion: null, IdUserExclusion: null, IdUserUpdate: null},
    ];
  }

  ngOnInit() {
    this.createChart();
    this.produtos();
    this.vendas = this.list_Produtos.length;
  }

  public createChart(){
    const labels = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: labels,
	       datasets: [
          {
            label: "Vendas",
            data: ['467','576', '572', '79', '92',
								 '574', '573', '576'],
            backgroundColor: '#003cff'
          },
          {
            label: "Lucro",
            data: ['542', '542', '536', '327', '17',
									 '10', '538', '541'],
            backgroundColor: 'limegreen'
          }
        ]
      },
      options: {
        aspectRatio:3.4
      }

    });
  }

  public async teste() {

    console.log(this.loginTeste)

    this.loginService.teste(this.loginTeste)
      .then(result => {
        if (result) {
          this.toastr.success(result.message);
        }
      })
      .catch(error => {
        this.toastr.error("Ocorreu um erro: " + error, "Error");
      });
  }


  public produtos(): void{
    this.list_Produtos = [
      {
        'id': 1,
        'nome_Produto': 'Cano PVC 100mm ou 4.3" x 3m',
        'numVendas_Produto': '120 Vendas',
        'img_Produto': 'https://cdn.leroymerlin.com.br/products/cano_pvc_para_esgoto_100mm_ou_4_3m_tigre_86009581_fee9_600x600.jpeg'
      },
      {
        'id': 2,
        'nome_Produto': 'Cimento CP II F 32 Todas as Obras 50kg Votoran',
        'numVendas_Produto': '100 Vendas',
        'img_Produto': 'https://cdn.leroymerlin.com.br/products/cimento_cp_ii_f_32_todas_as_obras_50kg_votoran_89368944_9a40_1800x1800.jpg'
      },
      {
        'id': 3,
        'nome_Produto': 'Kit Vaso Sanitário com Caixa Acoplada 3/6L Saída Vertical Quadra Branco Deca',
        'numVendas_Produto': '80 Vendas',
        'img_Produto': 'https://cdn.leroymerlin.com.br/products/combo_vaso_sanitario_com_caixa_acoplada_3_6l_quadra_branco_deca_89825036_d1ca_600x600.jpg'
      }
    ]
  }

  //Funções do sidebar
  public toggleSidebar() {
    this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
  }
  public getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }
  public hideSidebar() {
    this.sidebarservice.setSidebarState(false);
  }

}
