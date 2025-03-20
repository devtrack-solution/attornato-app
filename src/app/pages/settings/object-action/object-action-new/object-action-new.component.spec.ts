import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectActionNewComponent } from './object-action-new.component';

describe('ObjectActionNewComponent', () => {
  let component: ObjectActionNewComponent;
  let fixture: ComponentFixture<ObjectActionNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObjectActionNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ObjectActionNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
