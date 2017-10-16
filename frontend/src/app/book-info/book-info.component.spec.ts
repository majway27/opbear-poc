import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookinfoComponent } from './bookinfo.component';

describe('BookinfoComponent', () => {
  let component: BookinfoComponent;
  let fixture: ComponentFixture<BookinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
