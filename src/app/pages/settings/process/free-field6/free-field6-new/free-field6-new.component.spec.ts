import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeField6NewComponent } from './free-field6-new.component';

describe('FreeField6NewComponent', () => {
  let component: FreeField6NewComponent;
  let fixture: ComponentFixture<FreeField6NewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreeField6NewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FreeField6NewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
