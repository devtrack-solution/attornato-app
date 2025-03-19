import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeField2ListComponent } from './free-field2-list.component';

describe('FreeField2ListComponent', () => {
  let component: FreeField2ListComponent;
  let fixture: ComponentFixture<FreeField2ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreeField2ListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FreeField2ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
