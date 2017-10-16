import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router }                   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs';

import { BookService } from '../books/book.service';
import { Book } from '../books/book';

@Component({
  selector: 'app-bookinfo',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.css']
})
export class BookInfoComponent implements OnInit {

  book: Book;
  statusCode: number;
  
  constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}
  
  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.bookService.getBook(+params.get('id')))
      .subscribe(book => this.book = book);
  }
  
  deleteBook(id: number) {
    this.bookService.deleteBookById(id)
      .subscribe( successCode => {
		    //this.statusCode = successCode;
	  	  //Expecting success code 204 from server
		    this.statusCode = 204;
		    this.router.navigate(['/books']);
		  },
		  errorCode => this.statusCode = errorCode);
  }
  
  updateBook(book:Book) {
    this.bookService.updateBookById(this.book)
      .subscribe( successCode => {
		    //this.statusCode = successCode;
	  	  //Expecting success code 204 from server
		    this.statusCode = 204;
		    this.router.navigate(['/books']);
		  },
		  errorCode => this.statusCode = errorCode);
  }

  goBack(): void {
    this.location.back();
  }

}
