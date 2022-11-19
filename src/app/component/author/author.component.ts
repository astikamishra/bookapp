import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/model/Book';
import { AuthorService } from 'src/app/service/author.service';
import { BooksService } from 'src/app/service/books.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  searchString: string;
  books: Array<Book>=[];
  authors: string[]=[];
  isBooks: boolean = false;
  authorname: string;
  private bookSubscription : Subscription

  constructor(private bookService:BooksService){ }

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
    setTimeout(() => {
      let authorsArray = this.books.map(mapVal=> mapVal.author);
      authorsArray.forEach(authArray=>{
        authArray.forEach(auth => {
          this.authors.push(auth);
        });
        this.authors = Array.from(new Set(this.authors));
      });
      this.checkIsBook();
    }, 3000);
  }

  checkIsBook(){
    if(this.books.length>0 && this.books[0].title){
      this.isBooks = true;
    } else {
      this.isBooks = false;
    }
  }

}
