import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocatorEditComponent } from './locator-edit.component';

describe('LocatorEditComponent', () => {
  let component: LocatorEditComponent;
  let fixture: ComponentFixture<LocatorEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocatorEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LocatorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
