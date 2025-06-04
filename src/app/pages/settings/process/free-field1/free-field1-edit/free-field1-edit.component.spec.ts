import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeField1EditComponent } from './free-field1-edit.component';

describe('FreeField1EditComponent', () => {
  let component: FreeField1EditComponent;
  let fixture: ComponentFixture<FreeField1EditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreeField1EditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FreeField1EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
