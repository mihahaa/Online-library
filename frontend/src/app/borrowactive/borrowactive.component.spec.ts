import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowactiveComponent } from './borrowactive.component';

describe('BorrowactiveComponent', () => {
  let component: BorrowactiveComponent;
  let fixture: ComponentFixture<BorrowactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrowactiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
