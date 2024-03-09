import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingRegistrationTokenComponent } from './setting-registration-token.component';

describe('SettingRegistrationTokenComponent', () => {
  let component: SettingRegistrationTokenComponent;
  let fixture: ComponentFixture<SettingRegistrationTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingRegistrationTokenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SettingRegistrationTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
