import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageCreateDeploymentComponent } from './package-create-deployment.component';

describe('PackageCreateDeploymentComponent', () => {
  let component: PackageCreateDeploymentComponent;
  let fixture: ComponentFixture<PackageCreateDeploymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackageCreateDeploymentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PackageCreateDeploymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
