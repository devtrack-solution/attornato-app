import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactTypesEditComponent } from './contact-types-edit.component';

describe('ContactTypesEditComponent', () => {
  let component: ContactTypesEditComponent;
  let fixture: ComponentFixture<ContactTypesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactTypesEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactTypesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
