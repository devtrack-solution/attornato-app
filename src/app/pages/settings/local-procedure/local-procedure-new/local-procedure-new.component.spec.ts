import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalProcedureNewComponent } from './local-procedure-new.component';

describe('LocalProcedureNewComponent', () => {
  let component: LocalProcedureNewComponent;
  let fixture: ComponentFixture<LocalProcedureNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocalProcedureNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LocalProcedureNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
