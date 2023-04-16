import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDetailsOldComponent } from './book-details-old.component';

describe('BookDetailsOldComponent', () => {
  let component: BookDetailsOldComponent;
  let fixture: ComponentFixture<BookDetailsOldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookDetailsOldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookDetailsOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
