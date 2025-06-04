import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeField1ListComponent } from './free-field1-list.component';

describe('FreeField1ListComponent', () => {
  let component: FreeField1ListComponent;
  let fixture: ComponentFixture<FreeField1ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreeField1ListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FreeField1ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
