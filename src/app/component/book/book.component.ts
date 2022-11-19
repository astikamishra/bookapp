import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Book } from 'src/app/model/Book';
import { Favorite } from 'src/app/model/Favorite';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { BooksService } from 'src/app/service/books.service';
import { FavoriteService } from 'src/app/service/favorite.service';
import { RouterService } from 'src/app/service/router.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  @Input() favoritebooks: Favorite[];
  @Input() book: Book;
  @Output() deleteBookEvent = new EventEmitter<Favorite>();
  isFavorite: boolean;

  constructor(private authService: AuthenticationService, private favoriteService: FavoriteService, private route: RouterService, private snackBar: MatSnackBar){}

  addFavorite(book: Book){
    if(this.route.getToken()===null){
      this.openSnackBar('Login before taking any action.', '');
      this.route.routeToLogin();
    } else {
      let data = new Favorite();
      data.bookId = book.key;
      data.userId = Number(this.authService.getLoggedUserId());
      this.favoriteService.addFavorite(data).subscribe({
        next: (result) => {
          this.openSnackBar("Successfully added book in favorite.", '');
        },
        error: (error) => {
          this.openSnackBar(error, '');
        }
      });
    }
  }

  removeFavorite(book:Book){
    if(this.route.getToken()===null){
      this.openSnackBar('Login before taking any action.', '');
      this.route.routeToLogin();
    } else {
      let obj : Favorite = this.favoritebooks.find(fav => (book.key==fav.bookId) ); 
      if(obj){
        this.favoriteService.deletefavoriteBook(obj.favoriteId).subscribe({
          next: (result) => {
            this.deleteBookEvent.emit(obj);
            this.openSnackBar("Successfully remove book from favorite.", '');
          },
          error: (error) => {
            this.openSnackBar('Error while removing favorite.', '');
          }
        });
      }
    }
    
  }

  delete(id:any) {
    //this.bookService.deleteBook(id);
  }

  ngOnInit(): void {
    this.isFavorite = this.checkFavorite(this.favoritebooks, this.book);
  }

  openSnackBar(message: string, action: string) {  
    this.snackBar.open(message, action, {  
       duration: 2000,  
    });
  }

  checkFavorite(favoritebooks: Favorite[], book: Book): boolean {
    if(this.favoritebooks.length>0 && this.favoritebooks[0].bookId){
      return true;
    } else {
      return false;
    }
  }

}