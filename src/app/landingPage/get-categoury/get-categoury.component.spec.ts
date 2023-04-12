import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCategouryComponent } from './get-categoury.component';

describe('GetCategouryComponent', () => {
  let component: GetCategouryComponent;
  let fixture: ComponentFixture<GetCategouryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetCategouryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetCategouryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
