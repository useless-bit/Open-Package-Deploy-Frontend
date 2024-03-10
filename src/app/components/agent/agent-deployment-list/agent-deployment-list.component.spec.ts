import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentDeploymentListComponent } from './agent-deployment-list.component';

describe('AgentDeploymentListComponent', () => {
  let component: AgentDeploymentListComponent;
  let fixture: ComponentFixture<AgentDeploymentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentDeploymentListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgentDeploymentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
