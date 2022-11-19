import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../model/Book';
import { Favorite } from '../model/Favorite';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  favorites: Array<Favorite>=[];
  favoritesSubject: BehaviorSubject<Array<Favorite>> = new BehaviorSubject([new Favorite()]);

  constructor(private http: HttpClient, private authService: AuthenticationService, private snackBar: MatSnackBar) {
    this.fetchAllFavorites();
  }

  addFavorite(data: any) {
    return this.http.post(environment.favUrl+'/save-book', data, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
    }).pipe(catchError(this.handleError));
  }

  deletefavoriteBook(id:any):Observable<any> {
    return this.http.delete(environment.favUrl+'/book'+`/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
    }).pipe(catchError(this.handleError));
  }
  

  fetchAllFavorites() {
    let userId = this.authService.getLoggedUserId();
    return this.http.get(environment.favUrl+'/retrieve-all/'+userId, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
    }).subscribe({
      next: (result:any) => {
          result.forEach(x =>{    
            let obj = {
              favoriteId: x.favoriteId,
              bookId: x.bookId,
              userId: x.userId
            };
            this.favorites.push(obj); 
          });
        this.favoritesSubject.next(this.favorites);
      },
      error : (error) => { 
        this.openSnackBar('Error while retrieving favorite books from server.', '', 3000);
      }
    })
  }

  getFavoriteBooks(): BehaviorSubject<Array<Favorite>> {
    return this.favoritesSubject;
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
    } else if (err.status===409){
      errMsg = err.error;
      return throwError(()=> new Error(errMsg));
    } else if (err.status===500){
      errMsg = err.error.message;
      return throwError(()=> new Error(errMsg));
    } else {
      console.log("Error occured");
    }
    return throwError(()=> new Error(err.message))
  }

  openSnackBar(message: string, action: string, duration: number) {  
    this.snackBar.open(message, action, {  
       duration: duration,  
    });
  }
  
}
