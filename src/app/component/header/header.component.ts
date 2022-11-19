import { Component, OnInit } from '@angular/core';
import { RouterService } from 'src/app/service/router.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean;
  constructor(private route:RouterService) { }

  navigateToRegister(){
    this.route.routeToSignup();
  }

  navigateToLogin(){
    this.route.routeToLogin();
  }

  navigateToLogout(){
    this.route.logout();
  }

  ngOnInit(): void {
    this.isLoggedIn = this.checkedLoggedIn();
  }
  checkedLoggedIn(): boolean {
    if(this.route.getToken()){
      return true;
    } else {
      return false;
    }
  }

}
