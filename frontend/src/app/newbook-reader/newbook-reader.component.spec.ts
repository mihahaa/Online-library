import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewbookReaderComponent } from './newbook-reader.component';

describe('NewbookReaderComponent', () => {
  let component: NewbookReaderComponent;
  let fixture: ComponentFixture<NewbookReaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewbookReaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewbookReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
