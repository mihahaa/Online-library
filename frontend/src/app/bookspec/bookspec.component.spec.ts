import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookspecComponent } from './bookspec.component';

describe('BookspecComponent', () => {
  let component: BookspecComponent;
  let fixture: ComponentFixture<BookspecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookspecComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookspecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
