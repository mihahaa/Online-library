import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcommComponent } from './addcomm.component';

describe('AddcommComponent', () => {
  let component: AddcommComponent;
  let fixture: ComponentFixture<AddcommComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcommComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcommComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
