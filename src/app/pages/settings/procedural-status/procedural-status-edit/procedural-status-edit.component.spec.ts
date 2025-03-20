import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProceduralStatusEditComponent } from './procedural-status-edit.component';

describe('ProceduralStatusEditComponent', () => {
  let component: ProceduralStatusEditComponent;
  let fixture: ComponentFixture<ProceduralStatusEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProceduralStatusEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProceduralStatusEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
