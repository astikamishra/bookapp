import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { RegistrationService } from 'src/app/service/registration.service';
import { RouterService } from 'src/app/service/router.service';

@Component({
  selector: 'app-user-registeration',
  templateUrl: './user-registeration.component.html',
  styleUrls: ['./user-registeration.component.css']
})
export class UserRegisterationComponent implements OnInit {

  submitMessage: string;
  profilepicture: File;
  disciplines : Array<string>;
  dbImage: any;
  postResponse: any;
  regform: FormGroup; 


  constructor(private readonly fb: FormBuilder, private regService: RegistrationService, private route: RouterService, private snackBar: MatSnackBar) {

    this.regform = this.fb.group({
      username: ['', Validators.required ],
      password: ['', Validators.required ],
      firstname: ['', Validators.required ],
      lastname: ['', Validators.required ],
      email: ['', Validators.required ],
      phone: ['', Validators.required ],
      uploadfile: ['', Validators.required ]
    });
    
   }

   getRegisterUser() {
    let id: string= '1';
    this.regService.getUser(id)
      .subscribe(
        res => {
          this.postResponse = res;
          this.dbImage = 'data:image/jpeg;base64,' + this.postResponse.profilepicture;
        }
      );
  }

  registerUser(){
    if (this.regform.invalid) {
      this.openSnackBar("There is a problem with the form.", '');
      return;
    }
    const formData = new FormData();
    formData.append('file', this.profilepicture, this.profilepicture.name);
    formData.append('data',JSON.stringify(this.regform.getRawValue()));

    this.regService.registerUser(formData).subscribe({
      next : (result)=> { 
        this.regform.reset();
        this.openSnackBar('User saved successfully.', '');
        this.route.routeToLogin();
      },
      error : (error) => { 
        this.openSnackBar(error, '');
      }
    });
  }

  openSnackBar(message: string, action: string) {  
    this.snackBar.open(message, action, {  
       duration: 2000,  
    });
  } 

  onFileChange(event) {
    this.profilepicture = event.target.files[0];
  }

  ngOnInit(): void {  
  }

  get f() {
    return this.regform?.controls;
  }
}
