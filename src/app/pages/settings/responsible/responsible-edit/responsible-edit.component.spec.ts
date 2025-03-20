import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsibleEditComponent } from './responsible-edit.component';

describe('ResponsibleEditComponent', () => {
  let component: ResponsibleEditComponent;
  let fixture: ComponentFixture<ResponsibleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponsibleEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResponsibleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
