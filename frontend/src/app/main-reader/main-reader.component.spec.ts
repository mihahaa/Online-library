import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainReaderComponent } from './main-reader.component';

describe('MainReaderComponent', () => {
  let component: MainReaderComponent;
  let fixture: ComponentFixture<MainReaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainReaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
