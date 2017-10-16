import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { VehiclesComponent }      from './vehicles.component';
import { VehicleDetailComponent }  from './vehicle-detail.component';
import { NameGameComponent }  from './name-game.component';
import { BooksComponent }  from './books/books.component';
import { BookInfoComponent }  from './book-info/book-info.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'detail/:id', component: VehicleDetailComponent },
  { path: 'vehicles',   component: VehiclesComponent },
  { path: 'namegame',   component: NameGameComponent },
  { path: 'books',   component: BooksComponent },
  { path: 'book-info/:id', component: BookInfoComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}