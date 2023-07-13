import { Component, OnInit } from '@angular/core';
import { SidebarNavService } from '../shared/sidebar-nav/sidebar-nav.service';

@Component({
  selector: 'app-pdv-page',
  templateUrl: './pdv-page.component.html',
  styleUrls: ['./pdv-page.component.css']
})
export class PdvPageComponent implements OnInit {
  public title: string;

  constructor(public sidebarservice: SidebarNavService) {
    this.title = 'Ponto de Venda';
   }

  ngOnInit() {
  }

  //Funções do sidebar
  public toggleSidebar() {
    this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
    console.log(this.sidebarservice.setSidebarState);
  }
  public getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }
  public hideSidebar() {
    this.sidebarservice.setSidebarState(false);
    console.log(this.sidebarservice.setSidebarState);
  }

}
