import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeField2EditComponent } from './free-field2-edit.component';

describe('FreeField2EditComponent', () => {
  let component: FreeField2EditComponent;
  let fixture: ComponentFixture<FreeField2EditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreeField2EditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FreeField2EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
