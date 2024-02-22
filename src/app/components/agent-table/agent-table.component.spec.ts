import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentTableComponent } from './agent-table.component';

describe('AgentTableComponent', () => {
  let component: AgentTableComponent;
  let fixture: ComponentFixture<AgentTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
