import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentDetailPopupComponent } from './agent-detail-popup.component';

describe('AgentDetailComponent', () => {
  let component: AgentDetailPopupComponent;
  let fixture: ComponentFixture<AgentDetailPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentDetailPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentDetailPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
