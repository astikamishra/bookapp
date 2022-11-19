import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { RegistrationService } from 'src/app/service/registration.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  dbImage: any;
  postResponse: any;
  
  constructor(private regService: RegistrationService, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.getRegisterUser();
  }

  getRegisterUser() {
    let id: string= this.authService.getLoggedUserId();
    if(id){
      this.regService.getUser(id)
      .subscribe(
        res => {
          this.postResponse = res;
          this.dbImage = 'data:image/jpeg;base64,' + this.postResponse.profilepicture;
        }
      );
    }
  }

}
