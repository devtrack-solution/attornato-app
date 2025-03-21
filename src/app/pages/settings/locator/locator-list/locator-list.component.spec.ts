import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocatorListComponent } from './locator-list.component';

describe('LocatorListComponent', () => {
  let component: LocatorListComponent;
  let fixture: ComponentFixture<LocatorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocatorListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LocatorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
