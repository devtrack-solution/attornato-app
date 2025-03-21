import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectsNewComponent } from './subjects-new.component';

describe('SubjectsNewComponent', () => {
  let component: SubjectsNewComponent;
  let fixture: ComponentFixture<SubjectsNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectsNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubjectsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
