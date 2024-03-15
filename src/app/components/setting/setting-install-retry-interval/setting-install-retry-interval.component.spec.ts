import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingInstallRetryIntervalComponent} from './setting-install-retry-interval.component';

describe('SettingInstallRetryIntervalComponent', () => {
  let component: SettingInstallRetryIntervalComponent;
  let fixture: ComponentFixture<SettingInstallRetryIntervalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingInstallRetryIntervalComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SettingInstallRetryIntervalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
