import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingDeploymentValidationComponent } from './setting-deployment-validation.component';

describe('SettingDeploymentValidationComponent', () => {
  let component: SettingDeploymentValidationComponent;
  let fixture: ComponentFixture<SettingDeploymentValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingDeploymentValidationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SettingDeploymentValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
