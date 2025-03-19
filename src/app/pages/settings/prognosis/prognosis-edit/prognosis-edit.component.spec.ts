import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrognosisEditComponent } from './prognosis-edit.component';

describe('PrognosisEditComponent', () => {
  let component: PrognosisEditComponent;
  let fixture: ComponentFixture<PrognosisEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrognosisEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrognosisEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
