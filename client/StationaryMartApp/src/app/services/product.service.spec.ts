import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule,RouterTestingModule]
  }));

  it('should be created', () => {
    const service: ProductService = TestBed.get(ProductService);
    expect(service).toBeTruthy();
  });
});
