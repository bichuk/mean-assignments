import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticatedUserComponent } from './authenticated-user.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../services/user.service';

describe('AuthenticatedUserComponent', () => {
  let component: AuthenticatedUserComponent;
  let fixture: ComponentFixture<AuthenticatedUserComponent>;  
  let mockUserService;

  beforeEach(async(() => {
    mockUserService = jasmine.createSpyObj(['login']);   

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: UserService, useValue: mockUserService
        }],
      declarations: [ AuthenticatedUserComponent ],
      schemas:[NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticatedUserComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should create', () => {    
    expect(component).toBeTruthy();
  });
  it('should signout', () => { 
    component.signOut();        

    expect(mockUserService.isLoggedIn).toBe(undefined);    
    //expect(fixture.componentInstance.loggedIn).toBe(true);    
  });
});
