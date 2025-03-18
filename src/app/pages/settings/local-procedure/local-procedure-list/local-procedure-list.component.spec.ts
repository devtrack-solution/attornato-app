import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalProcedureListComponent } from './local-procedure-list.component';

describe('LocalProcedureListComponent', () => {
  let component: LocalProcedureListComponent;
  let fixture: ComponentFixture<LocalProcedureListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocalProcedureListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LocalProcedureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
