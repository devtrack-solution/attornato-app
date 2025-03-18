import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalProcedureEditComponent } from './local-procedure-edit.component';

describe('LocalProcedureEditComponent', () => {
  let component: LocalProcedureEditComponent;
  let fixture: ComponentFixture<LocalProcedureEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocalProcedureEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LocalProcedureEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
