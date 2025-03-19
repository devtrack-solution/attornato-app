import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactTypesNewComponent } from './contact-types-new.component';

describe('ContactTypesNewComponent', () => {
  let component: ContactTypesNewComponent;
  let fixture: ComponentFixture<ContactTypesNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactTypesNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactTypesNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
