import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrognosisListComponent } from './prognosis-list.component';

describe('PrognosisListComponent', () => {
  let component: PrognosisListComponent;
  let fixture: ComponentFixture<PrognosisListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrognosisListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrognosisListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
