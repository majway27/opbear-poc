import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { BookService } from './book.service';
import { Book } from './book';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  providers: [BookService]
})

export class BooksComponent implements OnInit {
  
  books: Book[];
  errorMessage: String;
  //name: String;
  selectedBook: Book;
  
  book = new Book();      
  
  constructor(
    private router: Router,
    private bookService: BookService) { }
  
  ngOnInit(): void {
	  this.fetchBooks();
	  //this.book["id"] = 5;
	  //this.book["name"] = "Typescript";
  }
  
  fetchBooks(): void {
      this.bookService.getBooksWithObservable()
        .subscribe( books => this.books = books,
          error => this.errorMessage = <any>error);   
  }
  
  addBook(): void {
    this.bookService.addBookWithObservable(this.book)
    .subscribe( book => {
  	  this.fetchBooks();		
      this.reset();
    },
    error => this.errorMessage = <any>error);
  }
  
  onSelect(book: Book): void {
    this.selectedBook = book;
  }
  
  gotoInfo(): void {
    this.router.navigate(['/book-info', this.selectedBook.id]);
  }
  
  private reset() {
    this.book.id = null;	 
    this.book.name = null;
    this.errorMessage = null;
    //this.name = null;
  } 

}
