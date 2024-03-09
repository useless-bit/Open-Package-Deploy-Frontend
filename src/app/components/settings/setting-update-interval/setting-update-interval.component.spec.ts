import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingUpdateIntervalComponent } from './setting-update-interval.component';

describe('SettingUpdateCheckTimeoutComponent', () => {
  let component: SettingUpdateIntervalComponent;
  let fixture: ComponentFixture<SettingUpdateIntervalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingUpdateIntervalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingUpdateIntervalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
