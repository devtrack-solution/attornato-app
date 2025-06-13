import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileNewComponent } from './profile-new.component';


describe('ProfileNewComponent', () => {
  let component: ProfileNewComponent;
  let fixture: ComponentFixture<ProfileNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
