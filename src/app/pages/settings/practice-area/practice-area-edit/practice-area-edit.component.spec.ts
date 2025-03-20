import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeAreaEditComponent } from './practice-area-edit.component';

describe('PracticeAreaEditComponent', () => {
  let component: PracticeAreaEditComponent;
  let fixture: ComponentFixture<PracticeAreaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PracticeAreaEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PracticeAreaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
