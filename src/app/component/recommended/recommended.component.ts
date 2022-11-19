import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/model/Book';
import { BooksService } from 'src/app/service/books.service';

@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.css']
})
export class RecommendedComponent implements OnInit {

  searchString: string;
  books: Array<Book>=[];
  isBooks: boolean = false;
  private bookSubscription : Subscription

  constructor(private bookService:BooksService){ 
    this.checkIsBook();
  }

  getBooks(){
    this.bookSubscription = this.bookService.booksSubject.subscribe( res => {
      this.bookService.getBooks().subscribe({
        next : ( result ) => {
          this.books = result;
          this.checkIsBook();
        },
        error: (error) => {}
      });
    });
  }  

  ngOnInit(): void {
    this.getBooks();
  }

  checkIsBook(){
    if(this.books.length>0 && this.books[0].title){
      this.isBooks = true;
    } else {
      this.isBooks = false;
    }
  }

}
