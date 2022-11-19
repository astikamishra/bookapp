import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { RouterService } from 'src/app/service/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitMessage: string;
  form: FormGroup;
  username = new FormControl();
  password = new FormControl();

  constructor(private readonly fb: FormBuilder, private router: RouterService, private authService: AuthenticationService, private snackBar: MatSnackBar){
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  };

  login() {
    if (this.form.invalid) {
      console.log('There is a problem with the form');
      return;
    } 
    
    this.authService.authenticateUser(this.form.getRawValue()).subscribe({
      next: (result) => {
        this.openSnackBar("Login Success", '');
        var parsedJson = JSON.parse(JSON.stringify(result));
        this.authService.setBearerToken(parsedJson.token);
        this.authService.setLogedUserId(parsedJson.userId);
        this.router.routeToDashboard();
      },
      error: (error) => {
        let msg: string;
        console.log(error); 
        if(error.status===403){
        //if(typeof(error)=="string"){
          msg = error.error.message;
          //msg = error;
          console.log(error);
        } else {
          msg = error.message;
        }
        this.openSnackBar('Login failed. Please check your credentials.', '');
      }
    });
  }

  navigateToRegister(){
    this.router.routeToSignup();
  }

  ngOnInit(): void {
  }

  get f() {
    return this.form?.controls;
  }

  openSnackBar(message: string, action: string) {  
    this.snackBar.open(message, action, {  
       duration: 2000,  
  });

  }

}
