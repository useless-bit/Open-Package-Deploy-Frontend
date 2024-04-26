import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AgentInformationComponent} from './agent-information.component';

describe('AgentInformationComponent', () => {
  let component: AgentInformationComponent;
  let fixture: ComponentFixture<AgentInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentInformationComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AgentInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
