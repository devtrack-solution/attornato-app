import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeField6ListComponent } from './free-field6-list.component';

describe('FreeField6ListComponent', () => {
  let component: FreeField6ListComponent;
  let fixture: ComponentFixture<FreeField6ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreeField6ListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FreeField6ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
