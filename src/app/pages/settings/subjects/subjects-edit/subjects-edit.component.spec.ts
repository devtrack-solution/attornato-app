import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectsEditComponent } from './subjects-edit.component';

describe('SubjectsEditComponent', () => {
  let component: SubjectsEditComponent;
  let fixture: ComponentFixture<SubjectsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectsEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubjectsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
