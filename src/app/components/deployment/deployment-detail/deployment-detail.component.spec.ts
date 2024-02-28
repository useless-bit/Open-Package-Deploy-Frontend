import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeploymentDetailComponent } from './deployment-detail.component';

describe('DeploymentDetailComponent', () => {
  let component: DeploymentDetailComponent;
  let fixture: ComponentFixture<DeploymentDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeploymentDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeploymentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
