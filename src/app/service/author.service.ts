import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Book } from '../model/Book';
import { BooksService } from './books.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorService implements OnInit{

  authors: Array<string>=[];
  authorSubject: BehaviorSubject<Array<string>> = new BehaviorSubject([]);
  books: Array<Book>=[];
  private bookSubscription : Subscription

  constructor(private bookService: BooksService) {
    console.log("AuthorService Constructor");
    this.getAuthors();
  }

  getAuthors(){
    console.log("getAuthors of author service");
    console.log(JSON.stringify(this.books));
    this.books.map(obj=> obj.author).forEach(autharray => {
      autharray.forEach(auth =>{
        let condition : string = this.authors.find(fkey => (fkey=== auth) ); 
        if(!condition){
          this.authors.push(auth);
        }
      });
    });
  }

  ngOnInit(): void {
    console.log("AuthorService Init");
  }
}
