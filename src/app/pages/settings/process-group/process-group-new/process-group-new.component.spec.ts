import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessGroupNewComponent } from './process-group-new.component';

describe('ProcessGroupNewComponent', () => {
  let component: ProcessGroupNewComponent;
  let fixture: ComponentFixture<ProcessGroupNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessGroupNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcessGroupNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
