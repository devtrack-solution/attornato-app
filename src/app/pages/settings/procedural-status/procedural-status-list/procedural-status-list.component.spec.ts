import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProceduralStatusListComponent } from './procedural-status-list.component';

describe('ProceduralStatusListComponent', () => {
  let component: ProceduralStatusListComponent;
  let fixture: ComponentFixture<ProceduralStatusListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProceduralStatusListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProceduralStatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
