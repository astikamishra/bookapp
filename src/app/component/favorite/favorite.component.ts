import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/model/Book';
import { Favorite } from 'src/app/model/Favorite';
import { BooksService } from 'src/app/service/books.service';
import { FavoriteService } from 'src/app/service/favorite.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  searchString: string;
  favorites: Array<Favorite>=[];
  isFavorites: boolean = false;
  private favoriteSubscription : Subscription

  favBooks: Array<Book>=[];
  allBooks: Array<Book>=[];
  private bookSubscription : Subscription

  constructor(private bookService:BooksService, private favoriteService: FavoriteService){ 
    this.getAllBooks();
    this.checkIsFavoriteBook();
  }

  removeFavorite(obj:Favorite){
    this.favorites = this.favorites.filter(val=> val.favoriteId!=obj.favoriteId);
    this.setAllFavoriteBooks(this.favorites);
  }

  setAllFavoriteBooks(result: any){
    this.favBooks = this.allBooks.filter((book:Book)=>{
      let isPresent: boolean = false;
      result.forEach((fav)=>{
        if(fav.bookId==book.key){
          isPresent = true;
        }
      });
      return isPresent;
    });
    this.checkIsFavoriteBook();
  }

  getFavorites(){
    this.favoriteService.fetchAllFavorites();
    this.favoriteSubscription = this.favoriteService.favoritesSubject.subscribe( res => {
      this.favoriteService.getFavoriteBooks().subscribe({
        next : ( result ) => {
          this.favorites = result;
          this.setAllFavoriteBooks(result);
        },
        error: (error) => {}
      });
    });
  }  

  ngOnInit(): void {
    this.getFavorites();
  }

  checkIsFavoriteBook(){
    if(this.favBooks.length>0 && this.favBooks[0].title){
      this.isFavorites = true;
    } else {
      this.isFavorites = false;
    }
  }

  getAllBooks(){
    this.bookSubscription = this.bookService.booksSubject.subscribe( res => {
      this.bookService.getBooks().subscribe({
        next : ( result ) => {
          this.allBooks = result;
        },
        error: (error) => {}
      });
    });
  }

}
