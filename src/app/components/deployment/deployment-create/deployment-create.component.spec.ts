import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeploymentCreateComponent} from './deployment-create.component';

describe('DeploymentCreateComponent', () => {
  let component: DeploymentCreateComponent;
  let fixture: ComponentFixture<DeploymentCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeploymentCreateComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DeploymentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
