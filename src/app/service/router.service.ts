import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor(private route: Router, private location: Location, private authService: AuthenticationService) { }

  routeToHome(){
    this.route.navigate(['home']);
  }
  routeToLogin(){
    this.route.navigate(['home/login']);
  }
  routeToSignup(){
    this.route.navigate(['home/register']);
  }
  routeToDashboard(){
    this.route.navigate(['userdashboard']);
  }

  routeToFavorite(){
    this.route.navigate(['userdashboard/favorite']);
  }
  routeBack(){
    this.location.back();
  }

  getToken() {
    //console.log(sessionStorage.getItem("loginkey"));
    return this.authService.getBearerToken(); //admin is stored as a token
  }

  logout() {
    this.authService.logout();
    this.routeToLogin();
  }

}
