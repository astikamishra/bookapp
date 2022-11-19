import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticateUser(data) {
    return this.http.post(environment.authUrl, data).pipe(catchError(this.handleError));
  }

  setBearerToken(token) {
    sessionStorage.setItem("bearerToken", token);
  }

  getBearerToken() {
    return sessionStorage.getItem("bearerToken");
  }

  setLogedUserId(token) {
    sessionStorage.setItem("currentuser", token);
  }

  getLoggedUserId() {
    return sessionStorage.getItem("currentuser");
  }

  logout(){
    sessionStorage.clear() //loginkey sessionstorage is cleared
    //console.log("token: "+sessionStorage.getItem("bearerToken"))
  }

  private handleError(err:HttpErrorResponse) {
    let errMsg:string;
    if(err.status===0) {
      console.log("Error occured, please try after sometime");
    } else if (err.status===404){
      errMsg = err.message;
      return throwError(()=> new Error(errMsg));
    } else if (err.status===403){
      errMsg = err.error.message;
      return throwError(()=> new Error("Unauthorized"));
    } else {
      console.log("Error occured");
    }
    return throwError(()=> new Error(err.message));
  }
  constructor(private http: HttpClient) { }
}
