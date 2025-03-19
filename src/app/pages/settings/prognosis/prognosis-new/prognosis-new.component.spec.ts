import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrognosisNewComponent } from './prognosis-new.component';

describe('PrognosisNewComponent', () => {
  let component: PrognosisNewComponent;
  let fixture: ComponentFixture<PrognosisNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrognosisNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrognosisNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
