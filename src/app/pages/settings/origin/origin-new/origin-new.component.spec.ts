import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OriginNewComponent } from './origin-new.component';

describe('OriginNewComponent', () => {
  let component: OriginNewComponent;
  let fixture: ComponentFixture<OriginNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OriginNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OriginNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
