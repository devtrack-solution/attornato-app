import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeField6EditComponent } from './free-field6-edit.component';

describe('FreeField6EditComponent', () => {
  let component: FreeField6EditComponent;
  let fixture: ComponentFixture<FreeField6EditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreeField6EditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FreeField6EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
