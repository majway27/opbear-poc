import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { Book } from './book';

@Injectable()
export class BookService {
    
    url = environment.books_api_url;
    key = environment.books_api_key;
    
    constructor(private http: Http) { }
    
    getBooksWithObservable(): Observable<Book[]> {
        let uri = ""
        console.log("GET WITH HEADERS");
        return this.http.get(this.url + uri, this.setup_opts())
            .map(this.extractData)
	        .catch(this.handleErrorObservable);
    }

    /*getBook(id: number): Observable<Book> {
        return this.getBooksWithObservable()
        .then(books => books.find(book => book.id === id));
    }*/
    getBook(id: number): Observable<Book> {
        let uri = "/" + id
        console.log("GET By ID: " + id);
        return this.http.get(this.url + uri, this.setup_opts())
            .map(this.extractData)
	        .catch(this.handleErrorObservable);
    }
    
    addBookWithObservable(book:Book): Observable<Book> {
        let uri = "/create"
        console.log("Adding Book: " + book.name);
        return this.http.post(this.url + uri, book, this.setup_opts())
	        .map(this.extractData)
            .catch(this.handleErrorObservable);
    }
    
    deleteBookById(id: number): Observable<Book> {
        let uri = "/delete" + "/" + id
        console.log("Deleting Book ID: " + id);
    	return this.http.delete(this.url + uri, this.setup_opts())
    	       .map(success => success.status)
                   .catch(this.handleErrorObservable);
    }	
    
    updateBookById(book:Book): Observable<Book> {
        let uri = "/update" + "/" + book.id
        console.log("Updating Book ID: " + book.id);
    	return this.http.put(this.url + uri, book, this.setup_opts())
    	       .map(success => success.status)
                   .catch(this.handleErrorObservable);
    }
    
    private extractData(res: Response) {
	    let body = res.json();
        return body;
    }
    
    private handleErrorObservable (error: Response | any) {
	    console.error(error.message || error);
	    return Observable.throw(error.message || error);
    }
    
    private setup_headers() {
        let headers = new Headers();  
        headers.append('X-Api-Key', this.key );
        headers.append('Content-Type', 'application/json');
        return headers
    }
    
    private setup_opts() {
        let opts = new RequestOptions();
        opts.headers = this.setup_headers();
        return opts
    }
}
