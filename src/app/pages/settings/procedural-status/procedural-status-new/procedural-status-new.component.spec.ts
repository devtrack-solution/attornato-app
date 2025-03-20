import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProceduralStatusNewComponent } from './procedural-status-new.component';

describe('ProceduralStatusNewComponent', () => {
  let component: ProceduralStatusNewComponent;
  let fixture: ComponentFixture<ProceduralStatusNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProceduralStatusNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProceduralStatusNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
