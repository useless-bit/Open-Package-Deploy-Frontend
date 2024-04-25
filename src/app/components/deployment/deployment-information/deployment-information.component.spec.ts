import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeploymentInformationComponent} from './deployment-information.component';

describe('DeploymentDetailComponent', () => {
  let component: DeploymentInformationComponent;
  let fixture: ComponentFixture<DeploymentInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeploymentInformationComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DeploymentInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
