import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeAreaListComponent } from './practice-area-list.component';

describe('PracticeAreaListComponent', () => {
  let component: PracticeAreaListComponent;
  let fixture: ComponentFixture<PracticeAreaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PracticeAreaListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PracticeAreaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
