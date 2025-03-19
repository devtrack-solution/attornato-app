import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactTypesListComponent } from './contact-types-list.component';

describe('ContactTypesListComponent', () => {
  let component: ContactTypesListComponent;
  let fixture: ComponentFixture<ContactTypesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactTypesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactTypesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
