import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountyEditComponent } from './county-edit.component';

describe('CountyEditComponent', () => {
  let component: CountyEditComponent;
  let fixture: ComponentFixture<CountyEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountyEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CountyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
