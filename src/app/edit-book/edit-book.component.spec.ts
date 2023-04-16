import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBookComponent1 } from './edit-book.component';

describe('EditBookComponent1', () => {
  let component: EditBookComponent1;
  let fixture: ComponentFixture<EditBookComponent1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBookComponent1 ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBookComponent1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
