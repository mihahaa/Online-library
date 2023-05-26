import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainModeratorComponent } from './main-moderator.component';

describe('MainModeratorComponent', () => {
  let component: MainModeratorComponent;
  let fixture: ComponentFixture<MainModeratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainModeratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainModeratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
