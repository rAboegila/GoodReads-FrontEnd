import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRedirectDialogComponent } from './login-redirect-dialog.component';

describe('LoginRedirectDialogComponent', () => {
  let component: LoginRedirectDialogComponent;
  let fixture: ComponentFixture<LoginRedirectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginRedirectDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginRedirectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
