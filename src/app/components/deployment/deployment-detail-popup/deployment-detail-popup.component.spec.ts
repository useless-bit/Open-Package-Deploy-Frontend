import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeploymentDetailPopupComponent } from './deployment-detail-popup.component';

describe('DeploymentDetailPopupComponent', () => {
  let component: DeploymentDetailPopupComponent;
  let fixture: ComponentFixture<DeploymentDetailPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeploymentDetailPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeploymentDetailPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
