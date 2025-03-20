import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectActionEditComponent } from './object-action-edit.component';

describe('ObjectActionEditComponent', () => {
  let component: ObjectActionEditComponent;
  let fixture: ComponentFixture<ObjectActionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObjectActionEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ObjectActionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
