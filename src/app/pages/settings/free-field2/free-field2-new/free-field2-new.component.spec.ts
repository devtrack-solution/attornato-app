import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeField2NewComponent } from './free-field2-new.component';

describe('FreeField2NewComponent', () => {
  let component: FreeField2NewComponent;
  let fixture: ComponentFixture<FreeField2NewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreeField2NewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FreeField2NewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
