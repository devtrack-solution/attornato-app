import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountNewComponent } from './account-new.component';

describe('AccountNewComponent', () => {
  let component: AccountNewComponent;
  let fixture: ComponentFixture<AccountNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
