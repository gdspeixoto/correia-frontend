import { LoginService } from 'src/app/services/login.service';
import { SidebarNavService } from './sidebar-nav.service';
import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  styleUrls: ['./sidebar-nav.component.css']
})
export class SidebarNavComponent implements OnInit {

  public showMyClass: boolean;

  constructor(public sidebarservice: SidebarNavService, private loginService: LoginService) { }

  ngOnInit() {
    this.showMyClass = false;
  }

  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  toggleSidebar() {
    this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
  }

  logout(){
    this.loginService.LogoutUser()
  }
}
