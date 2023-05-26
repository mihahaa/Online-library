import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAdvComponent } from './search-adv.component';

describe('SearchAdvComponent', () => {
  let component: SearchAdvComponent;
  let fixture: ComponentFixture<SearchAdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchAdvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
