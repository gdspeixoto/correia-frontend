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

  public nomeUser: string;

  constructor(public sidebarservice: SidebarNavService, private loginService: LoginService) {
  }

  ngOnInit() {
    this.showMyClass = false;
  }

  ngAfterContentInit(){
    const user = sessionStorage.getItem("user");
    const decodedUser = JSON.parse(atob(user));
    const decodeUser = {
      decodedUser
    };

    this.nomeUser = decodeUser.decodedUser.name.split(" ")[0];;
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
