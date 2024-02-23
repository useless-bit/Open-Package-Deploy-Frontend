import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentOverviewComponent } from './agent-overview.component';

describe('AgentTableComponent', () => {
  let component: AgentOverviewComponent;
  let fixture: ComponentFixture<AgentOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
