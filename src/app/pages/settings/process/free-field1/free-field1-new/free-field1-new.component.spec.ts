import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeField1NewComponent } from './free-field1-new.component';

describe('FreeField1NewComponent', () => {
  let component: FreeField1NewComponent;
  let fixture: ComponentFixture<FreeField1NewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreeField1NewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FreeField1NewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
