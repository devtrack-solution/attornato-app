import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocatorNewComponent } from './locator-new.component';

describe('LocatorNewComponent', () => {
  let component: LocatorNewComponent;
  let fixture: ComponentFixture<LocatorNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocatorNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LocatorNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
