import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickListTypeComponent } from './pick-list-type.component';

describe('PickListTypeComponent', () => {
  let component: PickListTypeComponent;
  let fixture: ComponentFixture<PickListTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickListTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickListTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
