import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule,RouterTestingModule,HttpClientModule],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should successfully login', () => {
    fixture.debugElement.query(By.css('.userId')).nativeElement.value = 'admin';
    fixture.debugElement.query(By.css('.password')).nativeElement.value = 'admin';
    let loginForm = fixture.debugElement.query(By.css('.loginForm')).nativeElement;    
    
    fixture.whenStable().then( () => {
      fixture.componentInstance.login(loginForm);
      fixture.detectChanges();
      expect(fixture.componentInstance.errorMsg).toBe('');
    });
  });
});
