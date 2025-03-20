import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeAreaNewComponent } from './practice-area-new.component';

describe('PracticeAreaNewComponent', () => {
  let component: PracticeAreaNewComponent;
  let fixture: ComponentFixture<PracticeAreaNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PracticeAreaNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PracticeAreaNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
