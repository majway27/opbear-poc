import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule }     from './app-routing.module';

import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { BookService } from './books/book.service';
import { BookInfoComponent } from './book-info/book-info.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NameService } from './name.service';
import { NameGameComponent }  from './name-game.component';
import { VehicleDetailComponent } from './vehicle-detail.component';
import { VehiclesComponent } from './vehicles.component';
import { VehicleService } from './vehicle.service';


@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    BookInfoComponent,
    DashboardComponent,
    NameGameComponent,
    VehicleDetailComponent,
    VehiclesComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [ BookService, NameService, VehicleService ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
