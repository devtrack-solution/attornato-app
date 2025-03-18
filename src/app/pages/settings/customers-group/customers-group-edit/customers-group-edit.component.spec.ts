import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersGroupEditComponent } from './customers-group-edit.component';

describe('CustomersGroupEditComponent', () => {
  let component: CustomersGroupEditComponent;
  let fixture: ComponentFixture<CustomersGroupEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomersGroupEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomersGroupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
