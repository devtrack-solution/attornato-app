import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsibleNewComponent } from './responsible-new.component';

describe('ResponsibleNewComponent', () => {
  let component: ResponsibleNewComponent;
  let fixture: ComponentFixture<ResponsibleNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponsibleNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResponsibleNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
