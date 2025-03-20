import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectActionListComponent } from './object-action-list.component';

describe('ObjectActionListComponent', () => {
  let component: ObjectActionListComponent;
  let fixture: ComponentFixture<ObjectActionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObjectActionListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ObjectActionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
