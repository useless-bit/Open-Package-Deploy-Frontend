import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentCreateDeploymentComponent } from './agent-create-deploymentomponent.component';

describe('AgentDeploymentListComponent', () => {
  let component: AgentCreateDeploymentComponent;
  let fixture: ComponentFixture<AgentCreateDeploymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentCreateDeploymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentCreateDeploymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
