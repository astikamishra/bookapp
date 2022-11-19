import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  registerUser(data : FormData){
    return this.http.post(environment.registrationUrl+'/user', data).pipe(catchError(this.handleError));
  }

  getUser(id: string){
    return this.http.get(environment.registrationUrl+'/user'+`/${id}`);
  }

  private handleError(error:HttpErrorResponse) {
    let errMsg:string;
    if(error.status===0) {
      console.log("Error occured, please try after sometime");
    } else if (error.status===409){
      errMsg = error.error;
      return throwError(()=> new Error(errMsg));
    } else if (error.status===500){
      errMsg = error.error.message;
      return throwError(()=> new Error(errMsg));
    } else {
      console.log("Error occured");
    }
      return throwError(()=> new Error("Request cannot be processed. Please try after sometime"));
  }
}
