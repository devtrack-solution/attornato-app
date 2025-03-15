import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessGroupListComponent } from './process-group-list.component';

describe('ProcessGroupListComponent', () => {
  let component: ProcessGroupListComponent;
  let fixture: ComponentFixture<ProcessGroupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessGroupListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcessGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
