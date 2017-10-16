import { Component, OnInit } from '@angular/core';

import { NameService } from './name.service';
import { Name } from './name';

@Component({
  selector: 'name-game',
  templateUrl: './name-game.component.html'
  })

export class NameGameComponent implements OnInit {
    names: Name[];
    errorMessage: String;
    fName: String;
    name = new Name();      
    constructor(private nameService: NameService) { }
    ngOnInit(): void {
        this.name.fname = "Rob"
    }
    addName(): void {
        this.nameService.addName(this.name)
        .then( name => {
          this.reset();   
	      this.fName = name.fname;					 
	    },
        error => this.errorMessage = <any>error);
    }   
    private reset() {
        this.name.fname = null;
    }   
}