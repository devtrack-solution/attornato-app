import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessGroupEditComponent } from './process-group-edit.component';

describe('ProcessGroupEditComponent', () => {
  let component: ProcessGroupEditComponent;
  let fixture: ComponentFixture<ProcessGroupEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessGroupEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcessGroupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
