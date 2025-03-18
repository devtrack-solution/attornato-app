import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersGroupNewComponent } from './customers-group-new.component';

describe('CustomersGroupNewComponent', () => {
  let component: CustomersGroupNewComponent;
  let fixture: ComponentFixture<CustomersGroupNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomersGroupNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomersGroupNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
