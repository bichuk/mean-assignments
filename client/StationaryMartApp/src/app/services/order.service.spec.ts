import { TestBed } from '@angular/core/testing';

import { OrderService } from './order.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('OrderService', () => {  
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule,RouterTestingModule]    
  }));

  it('should be created', () => {
    const service: OrderService = TestBed.get(OrderService);
    expect(service).toBeTruthy();
  });  
});
