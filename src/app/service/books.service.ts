import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../model/Book';
import { AuthenticationService } from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class BooksService {

  books: Array<Book>=[];
  booksSubject: BehaviorSubject<Array<Book>> = new BehaviorSubject([new Book()]);

  constructor(private http: HttpClient, private authService: AuthenticationService, private snackBar: MatSnackBar) {
    this.fetchAllBooksFromServer();
  }

  fetchAllBooksFromServer() {
    let historyUrl = 'https://openlibrary.org/subjects/history.json';
    let dailyUrl = 'https://openlibrary.org/trending/daily.json';

    return this.http.get(dailyUrl).subscribe({
      next: (result:any) => {
          result.works.forEach(x =>{
            let obj = {
              title: x.title,
              key: x.key,
              author: x.author_name,
              publishyear: x.first_publish_year,
              availability: x.availability
              //edition: x.edition_count
            };
            this.books.push(obj); 
          });
        //this.books = result.works;
        this.booksSubject.next(this.books);
      },
      error : (error) => { 
        this.openSnackBar('Error while retrieving books from openlibrary.', '', 3000);
        }
    })
  }

  getBooks(): BehaviorSubject<Array<Book>> {
    return this.booksSubject;
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
      //throwError("Error occured" + `${error.message}`) 
  }

  openSnackBar(message: string, action: string, duration: number) {  
    this.snackBar.open(message, action, {  
       duration: duration,  
    });
  }

}
