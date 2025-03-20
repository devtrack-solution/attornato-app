import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaseNewComponent } from './phase-new.component';

describe('PhaseNewComponent', () => {
  let component: PhaseNewComponent;
  let fixture: ComponentFixture<PhaseNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhaseNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhaseNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
