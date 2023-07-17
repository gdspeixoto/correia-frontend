import { Component, OnInit } from '@angular/core';
import { SidebarNavService } from '../../shared/sidebar-nav/sidebar-nav.service';

@Component({
  selector: 'app-profile-account',
  templateUrl: './profile-account.component.html',
  styleUrls: ['./profile-account.component.css']
})
export class ProfileAccountComponent implements OnInit {

  public user: any;

  constructor(public sidebarservice: SidebarNavService) {
    const user = sessionStorage.getItem("user");
    const decodedUser = JSON.parse(atob(user));
    const decodeUser = {
      decodedUser
    };
    this.user = decodeUser.decodedUser;
  }

  ngOnInit(): void {
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
