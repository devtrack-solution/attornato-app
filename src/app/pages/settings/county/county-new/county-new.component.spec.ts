import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountyNewComponent } from './county-new.component';

describe('CountyNewComponent', () => {
  let component: CountyNewComponent;
  let fixture: ComponentFixture<CountyNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountyNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CountyNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
